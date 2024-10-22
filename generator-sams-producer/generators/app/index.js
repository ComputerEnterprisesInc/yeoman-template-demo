import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import path from 'path';


export default class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the mind-blowing ${chalk.red(
          "generator-express-mongodb"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "App Name",
        default: "myapp"
      },
      {
        type: "confirm",
        name: "mongodb",
        message: "Install MongoDB and Mongoose?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    //The ignore array is used to ignore files, push file names into this array that you want to ignore.
    const copyOpts = {
      globOptions: {
        ignore: []
      }
    };

    if (!this.props.mongodb)
      copyOpts.globOptions.ignore.push("**/mongoose.js");

    // set template parameters
    const opts = {
      name: this.props.name,
      mongodb: this.props.mongodb
    };

    // copy files
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(`${this.props.name}/`),
      opts,
      {},
      copyOpts
    );
  }

  // install() {
  //   console.log("getting app path");
  //   const appDir = path.join(process.cwd(), this.props.name);
  //   process.chdir(appDir);

  //   this.spawn('npm', ['install']);
  // }
};