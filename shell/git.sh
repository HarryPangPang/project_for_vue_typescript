#!/bin/sh
# !!!!运行前请给予权限！！！ 执行下面的命令👇
# chmod u+r+x ./shell/git.sh

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

cd $gitdir.git/hooks
if rename commit-msg.origin commit-msg  2>/dev/null
then
    echo '\n'
    echo 'Rename success'
else
    printf "%s\n"  "Rename fail"
fi

a =1