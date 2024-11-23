# VolvoSafety test automation framework
    -Volvo safety test automation framework implemented by using WebDriverIO, Typescript with Jasmine framework for assertions and verification

## 1. Local setup
### 1.1 Tools Info and setup
1. IDE: Download and install Visual Studio Code https://code.visualstudio.com/download
2. Download and install nodejs LTS https://nodejs.org/en/download/prebuilt-installer
3. Download and install Docker https://www.docker.com/get-started/
4. Clone the project and open it in your IDE
5. In your project folder, run `npm install` to install the dependencies

## 2. Using the framework
### 2.1 Running tests
1. `npm test` or `npm run test` will execute all the test cases on test environment(environment can be passed from ENV=test)

### 2.2 Reporting
1. `allure generate --clean && allure open` to generate and open allure report

### 2.3 Docker Solution
1. Dockerfile - dependencis can be added in Dockerfile
2. `docker build -t <suitable-image-name> .` 
        -> used to create the image
3. `docker run --rm -ti <provide-image-name>`
        -> used to run the test scripts
4. `docker tag <your-image-name>:<tag> <your-dockerhub-username>/<your-repository-name>:<tag>`
        -> used to tag the images with docker hub repo
5. `docker push <your-dockerhub-username>/<your-repository-name>:<tag>`
        -> used to push/upload image to docker hub repository
        
## 3. Project structure
1. `src\helper\env` -> environment files with corresponding test data(URL belongs to corresponding environment)
2. `src\helper\types` -> configuretions for environments
3. `src\pages` -> all ui pages with its elemnt locators and functions
4. `src\spec` -> all test scripts
5. `src\test-data` -> utils for clearing browser sessions and cookies, monitoring network, wait for loading pages and commonly referred methods
6. 'package.json' -> to keep the dependencies and its versions information
7. 'allure-results' -> will be generated while test execution
8. `tsconfig.json` -> to keep complier options for TS projects
9. `Dockerfile` -> to install the required dependencies to create docker images of the project
10. `wdio.conf.ts` - all the browser, timeout, parallel runs can be configured here
11. `wdio-deployment.yaml` -> to create kubenetes solution

## 4. Commnds
1. Installation
    -> `npm install` 
2. Execution
    -> `npm test`
3. Allure Report
    -> `rimraf ./allure-report ./allure-results` : delete the exisiting allure files
    -> `allure generate --clean && allure open` : to generate and open allure report
3. Docker
    -> docker build -t <replace_with_suitable_image_name> .  : to Create/build docker image locally
    -> docker run --rm -ti <replace_with_your_docker_image_name> : to run the docker image locally
    -> docker save -o <replace_with_suitable_file_name>.tar <replace_with_your_docker_image_name>:<replace_with_suitable_tag_name> : used to save docker image file in .tar format
    -> docker load -i <replace_with_file_name_from_the_above_step>.tar : used to load and use the docker image which shared
    -> follow the below for push the image and pull the image from docker hub(all from bash/cmd)
            -> Login to docker
            -> docker tag <your-image-name>:<tag> <your-dockerhub-username>/<your-repository-name>:<tag>
            -> docker push <your-dockerhub-username>/<your-repository-name>:<tag>
            -> docker pull <your-dockerhub-username>/<your-repository-name>:<tag>

## 5. Implemented Scenarios
    -> `scenarios.txt` : can find the information about the implemented scenarios