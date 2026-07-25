import { CommandRunner } from "../commandRunner";

export async function testRunner() {

    const runner = new CommandRunner();

    const output = await runner.run("node", [
        "--version"
    ]);

    console.log(output);

}