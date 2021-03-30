import { Command, flags } from "@oclif/command";
import axios from "axios";
const Table = require("cli-table3");
const chalk = require("chalk");

class Dogetick extends Command {
    static description = "An INR ticker for $DOGE based on the WazirX API";

    static flags = {
        version: flags.version({ char: "v" }),
        help: flags.help({ char: "h" }),
    };

    async run() {
        const { flags } = this.parse(Dogetick);

        const { data } = await axios.get(
            "https://api.wazirx.com/api/v2/market-status"
        );

        // const doge = data["markets"][87];

		let doge;

		for(let x in data["markets"]) {
			if(data["markets"][x]["baseMarket"] == "doge") {
				doge = data["markets"][x];
				break;
			}
		}

        const { last, low, high, buy, sell, volume, at, status } = doge;

        let table = new Table({
            head: ["Last", "High", "Low", "Buy", "Sell", "Volume"],
        });

        table.push([last, high, low, buy, sell, volume]);

        this.log("Current Price (DOGE): ", chalk.blue.bold(buy), "INR");
        this.log("Status:", chalk.green(status));
        this.log(table.toString());
        this.log("Fetched At:", new Date(at * 1000).toLocaleString());
    }
}

export = Dogetick;
