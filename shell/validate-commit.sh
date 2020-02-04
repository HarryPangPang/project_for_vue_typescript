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
    outdir='../../'

elif find ../../.git -false
then
   gitdir='../../'
   outdir='../../../'

elif find ../../../.git -false
then
    gitdir='../../../'
    outdir='../../../../'
else
    echo 'Find .git failed'
fi

commitMsg=$(cat ./shell/lib/commit-msg)

cd $gitdir.git/hooks

if find ./commit-msg.origin -false
then
    mv commit-msg commit-msg.origin
    touch commit-msg
    echo $commitMsg -e > commit-msg
else
    mv commit-msg commit-msg.origin
    touch commit-msg
    cat $outdir../shell/lib/commit-msg > commit-msg
fi