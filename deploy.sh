#!/bin/bash

echo "Deploy Script Started"

gitLastCommit=$(git show --summary --grep="Merge pull request")
if [[ -z "$gitLastCommit" ]]
then
	lastCommit=$(git log --format="%H" -n 1)
else
	echo "We got a Merge Request!"
	#take the last commit and take break every word into an array
	arr=($gitLastCommit)
	#the 5th element in the array is the commit ID we need. If git log changes, this breaks. :(
	lastCommit=${arr[4]}
fi
echo $lastCommit

filesChanged=$(git diff-tree --no-commit-id --name-only -r $lastCommit)
if [ ${#filesChanged[@]} -eq 0 ]; then
    echo "No files to update"
else
    for f in $filesChanged
	do
	    echo f

		#do not upload these files that aren't necessary to the site
		if [ "$f" != ".gitignore" ] &&
		[ "$f" != ".travis.yml" ] &&
		[ "$f" != "deploy.sh" ] &&
		[ "$f" != "LICENSE" ] &&
		[ "$f" != "package.json" ] &&
		[ "$f" != "README.md" ] &&
		[ "$f" != "startup.js" ]
		then
	 		echo "Uploading $f"
	 		curl --ftp-create-dirs -T -v $f -u $FTP_USER:$FTP_PASS ftp://ftp.byethost14.com/$f
		fi
	done
fi