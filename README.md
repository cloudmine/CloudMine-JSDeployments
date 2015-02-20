# SnippetSamples
Sample project which demonstrates a snippet workflow with CloudMine server code execution. Includes a configuration file for multiple environments, and a Grunt build file for deploying to different environment.

##Configuration
Managing the configuration of the snippets for an application resides in the *config.js* file. There is two variables at the top for configurations specific to third party libraries which then get inserted into the configuration JSON shapes for the environments. This snippet library has three environments for which application ID, API keys and a master key can be setup. 

##Building
The values in the *config.js* get injected to the individual snippet files via the **Grunt** build procedure found in *GruntFile.js*. To import a variable from the configuration the variable needed is referenced in the snippet like so:

    var applicationID = "<%= appId %>";
    
Members referenced such as *appId* are replaced with the value on the environment object when built. *Render* commands are used in conjunction with the environment from the command line to build the files. Rendering a snippet to an environment is done with the following command:

    grunt render:production
    grunt render:staging
    grunt render:
    
Output from the build is placed in the */bin/ENVIRONMENT_NAME* directory and the snippets can be run and debugged from there. Notice that the variables in the snippet with the syntax for injection are now replaced with the members of the configuration file.

##Deploying
Deploying the code works in the same way as building the code. The deployment script works off the environment variables and is why the master key is a member of each configuration. It is advised to locally ignore changes to the *config.js* file in order to keey the master keys and application id off of the git repository. Locally ignoring changes to a git tracked file can be done with the following command:

    git update-index --assume-unchanged config.js

Deploying snippets to an environment is done with the following command:

    grunt deploy:pruduction
    grunt deploy:staging
    grunt deploy:dev
    
If you ever accidentally commit the mast key, it is good practice to invalidate the key and redeploy with the newly created keys. 
