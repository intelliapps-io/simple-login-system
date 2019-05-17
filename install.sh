#!/bin/sh 
tmux new-session -s "install" -d;
tmux send-keys 'cd server' C-m;
tmux send-keys 'npm i' C-m;
tmux split-window -h;
tmux send-keys 'cd client' C-m;
tmux send-keys 'npm i' C-m;
tmux -2 attach-session -d;