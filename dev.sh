#!/bin/sh 
tmux new-session -s "dev" -d;
tmux send-keys 'cd server' C-m;
tmux send-keys 'npm run dev' C-m;
tmux split-window -h;
tmux send-keys 'cd client' C-m;
tmux send-keys 'npm start' C-m;
tmux split-window -h;
tmux send-keys 'cd server' C-m;
tmux send-keys 'npm run pg' C-m;
tmux -2 attach-session -d;
clear;