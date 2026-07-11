import BaseCommand from "./commands/BaseCommand.ts";
import MoveForwardCommand from "./commands/MoveForwardCommand.ts";
import RotateCommand from "./commands/RotateCommand.ts";
import StrafeCommand from "./commands/StrafeCommand.ts";
import WaitCommand from "./commands/WaitCommand.ts";

import IntakeCommand from "./commands/IntakeCommand.ts";
import ShooterCommand from "./commands/ShooterCommand.ts";

export default class Parser {

    parse(code: string): BaseCommand[] {

        const commands: BaseCommand[] = [];

        const lines = code
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);

        for (const line of lines) {

            const match = line.match(/^([a-zA-Z]+)\((.*)\)$/);

            if (!match) continue;

            const name = match[1];

            const args = match[2]
                .split(",")
                .map(arg => arg.trim())
                .filter(arg => arg.length > 0)
                .map(Number);

            switch (name) {

                case "andarfrente":

                    commands.push(
                        new MoveForwardCommand(args[0], args[1])
                    );

                    break;

                case "andartras":

                commands.push(
                    new MoveForwardCommand(-args[0], args[1])
                );

                break;

                case "giraresquerda":

                    commands.push(
                        new RotateCommand(-args[0])
                    );

                    break;

                case "girardireita":

                    commands.push(
                        new RotateCommand(args[0])
                    );

                    break;

                case "andaresquerda":

                    commands.push(
                        new StrafeCommand(
                            -args[0],
                            args[1]
                        )
                    );
                
                    break;
                
                case "andardireita":
                
                    commands.push(
                        new StrafeCommand(
                            args[0],
                            args[1]
                        )
                    );
                
                    break;
                
                case "ligarintake":

                    commands.push(
                        new IntakeCommand(true)
                    );
                
                    break;
                
                case "desligarintake":
                
                    commands.push(
                        new IntakeCommand(false)
                    );
                
                    break;
                
                case "ligarshooter":
                
                    commands.push(
                        new ShooterCommand(true)
                    );
                
                    break;
                
                case "desligarshooter":
                
                    commands.push(
                        new ShooterCommand(false)
                    );
                
                    break;


                case "esperar":

                    commands.push(
                    new WaitCommand(args[0])
                );

                break;

            }

        }

        return commands;

    }

}