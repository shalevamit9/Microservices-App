cd ./apps

echo What is the service name?
read SERVICE_NAME

nest new $SERVICE_NAME

cd ./$SERVICE_NAME

rm -rf ./node_modules
rm -rf ./.eslintrc.js
rm -rf ./.gitignore
rm -rf ./.git
rm -rf ./.prettierrc
rm -rf ./README.md
rm -rf ./tsconfig.json
rm -rf ./tsconfig.build.json

json='{\n  "extends": "../../tsconfig.json",\n  "compilerOptions": {\n    "declaration": false,\n    "outDir": "./dist"\n  },\n  "include": [\n    "src/**/*"\n  ],\n  "exclude": [\n    "node_modules",\n    "dist",\n    "test",\n    "**/*spec.ts"\n  ]\n}'
printf "$json" > ./tsconfig.json

echo "docker build -t $SERVICE_NAME -f ./Dockerfile --build-arg service=$SERVICE_NAME ." > create-docker-image.sh
