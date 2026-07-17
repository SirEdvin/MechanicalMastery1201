SHELL := /usr/bin/env bash
.SHELLFLAGS := -eu -o pipefail -c

PACK_NAME := mechanical-mastery
BASE_VERSION ?= 0.1.0
VERSION ?= $(shell git tag --list 'v$(BASE_VERSION)-beta.*' | sed 's/.*beta\.//' | awk 'BEGIN { max = 0 } $$1 > max { max = $$1 } END { print "$(BASE_VERSION)-beta." (max + 1) }')
TAG := v$(VERSION)
BUILD_DIR := build
MRPACK := $(BUILD_DIR)/$(PACK_NAME)-$(VERSION).mrpack
CURSEFORGE_ZIP := $(BUILD_DIR)/$(PACK_NAME)-$(VERSION).zip
CHECKSUMS := $(BUILD_DIR)/SHA256SUMS-$(VERSION).txt

.PHONY: help check-release-tools release

help:
	@printf '%s\n' \
	  'Release targets:' \
	  '  make release                         Build and publish the next 0.1.0 beta' \
	  '  make release BASE_VERSION=0.2.0      Build and publish the next beta for another base version' \
	  '  make release VERSION=0.2.0-beta.1    Build and publish an explicit beta version'

check-release-tools:
	@command -v git >/dev/null
	@command -v gh >/dev/null
	@command -v packwiz >/dev/null
	@command -v python3 >/dev/null
	@command -v unzip >/dev/null
	@command -v sha256sum >/dev/null
	@gh auth status >/dev/null

release: check-release-tools
	@[[ "$(VERSION)" =~ ^[0-9]+\.[0-9]+\.[0-9]+-beta\.[1-9][0-9]*$$ ]] || { echo "Invalid beta VERSION: $(VERSION)" >&2; exit 1; }
	@[[ "$$(git branch --show-current)" == "main" ]] || { echo 'Releases must be made from main' >&2; exit 1; }
	@[[ -z "$$(git status --porcelain)" ]] || { echo 'Working tree must be clean before release' >&2; git status --short; exit 1; }
	@git fetch origin main --tags
	@[[ "$$(git rev-list --count HEAD..origin/main)" == 0 ]] || { echo 'Local main is behind origin/main' >&2; exit 1; }
	@! git rev-parse --verify --quiet "refs/tags/$(TAG)" >/dev/null || { echo 'Tag $(TAG) already exists' >&2; exit 1; }
	@! gh release view "$(TAG)" >/dev/null 2>&1 || { echo 'GitHub release $(TAG) already exists' >&2; exit 1; }
	@VERSION='$(VERSION)' python3 -c 'import os, pathlib, re; p=pathlib.Path("pack.toml"); s=p.read_text(); s,n=re.subn(r"(?m)^version = \"[^\"]+\"$$", "version = \"{}\"".format(os.environ["VERSION"]), s, count=1); assert n == 1, "pack.toml version not found"; p.write_text(s)'
	@packwiz refresh
	@before="$$(sha256sum pack.toml index.toml)"; packwiz refresh; after="$$(sha256sum pack.toml index.toml)"; [[ "$$before" == "$$after" ]] || { echo 'packwiz refresh is not deterministic' >&2; exit 1; }
	@mkdir -p '$(BUILD_DIR)'
	@rm -f '$(MRPACK)' '$(CURSEFORGE_ZIP)' '$(CHECKSUMS)'
	@packwiz modrinth export -o '$(MRPACK)'
	@packwiz curseforge export -o '$(CURSEFORGE_ZIP)'
	@unzip -tq '$(MRPACK)' >/dev/null
	@unzip -tq '$(CURSEFORGE_ZIP)' >/dev/null
	@cd '$(BUILD_DIR)' && sha256sum '$(notdir $(MRPACK))' '$(notdir $(CURSEFORGE_ZIP))' > '$(notdir $(CHECKSUMS))'
	@git diff --check
	@git add pack.toml index.toml
	@git commit -m 'chore: release $(VERSION)'
	@git tag -a '$(TAG)' -m 'Mechanical Mastery $(VERSION)'
	@git push origin main '$(TAG)'
	@gh release create '$(TAG)' '$(MRPACK)' '$(CURSEFORGE_ZIP)' '$(CHECKSUMS)' --title 'Mechanical Mastery $(VERSION)' --prerelease --generate-notes --verify-tag
	@gh release view '$(TAG)' --json tagName,name,isPrerelease,url,assets
