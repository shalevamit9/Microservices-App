# shell script to delete all node_modules, dist and .turbo directories from the repository

find . -name "node_modules" -exec rm -rf {} \;
find . -name "dist" -exec rm -rf {} \;
find . -name ".turbo" -exec rm -rf {} \;
