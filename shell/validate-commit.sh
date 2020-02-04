#!/bin/sh
# !!!!运行前请给予权限！！！ 执行下面的命令👇
chmod u+r+x ./shell/validate-commit.sh

gitdir='./'
outdir='../'
if find .git -false
then
    gitdir='./'
    outdir='../'

elif find ../.git -false
then
    gitdir='../'

elif find ../../.git -false
then
   gitdir='../../'

elif find ../../../.git -false
then
    gitdir='../../../'
else
    echo 'Find .git failed'
fi

commitMsg=$(cat ./shell/lib/commit-msg)

cd $gitdir.git/hooks

if find ./commit-msg.origin -false
then
    :
else
    mv commit-msg commit-msg.origin
    touch commit-msg
    echo $commitMsg > commit-msg
fi