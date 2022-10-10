.PHONY: push

CURRENT_BRANCH_NAME := $(shell git symbolic-ref --short HEAD)

add:
	git add .

commit: add
	git-cz

rebase-main: commit
	git pull --rebase origin main

push:
	git push --force-with-lease origin $(CURRENT_BRANCH_NAME)

release-dev: push
	-gh release delete dev -y
	-git tag -d dev
	-git push origin :refs/tags/dev
	gh release create dev --notes "dev release" --target dev --title "Release dev"

ln:
	rm -rf ~/.s/components/devsapp.cn/devsapp/fc-proxied-invoke/dist
	ln -s $(shell pwd)/dist ~/.s/components/devsapp.cn/devsapp/fc-proxied-invoke/dist
	ls -al ~/.s/components/devsapp.cn/devsapp/fc-proxied-invoke 
