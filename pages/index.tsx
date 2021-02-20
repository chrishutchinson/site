import { Page } from "../components/Page";
import { faTasks, faWind } from "@fortawesome/free-solid-svg-icons";
import { faRaspberryPi } from "@fortawesome/free-brands-svg-icons";
import { Rail } from "../components/Rail";
import { Card } from "../components/Card";
import { Box, Text } from "theme-ui";

export default function Home() {
  return (
    <>
      <Page>
        <Box
          sx={{
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Rail title="Projects">
            <Card
              title="Train departure board"
              href="https://github.com/chrishutchinson/train-departure-screen"
              icon={faRaspberryPi}
              radius="100px 15px 225px 15px/15px 225px 15px 100px"
            >
              <p>
                A python script to display replica real-time UK railway station
                departure screens for SSD13xx devices
              </p>
            </Card>

            <Card
              title="Talk: React Testing Library"
              href="https://github.com/chrishutchinson/talk-react-testing-library"
              icon={faTasks}
            >
              <p>
                A talk given in July 2019 giving a high level introduction to
                React Testing Library
              </p>
            </Card>

            <Card
              title="Paint your own Christmas tree"
              href="https://github.com/chrishutchinson/christmas-tree-painter"
              icon={faRaspberryPi}
              radius="15px 120px 15px 200px/120px 15px 200px 15px"
            >
              <p>
                TypeScript UI and Node.js API for remotely controlling WS2811
                LEDs on a Christmas tree
              </p>
            </Card>

            <Card
              title="UK Air Quality Alexa Skill"
              href="https://github.com/chrishutchinson/air-quality-alexa-skill"
              icon={faWind}
            >
              <p>
                Alexa Skill for finding out about your local air quality. Ask:
                "Alexa, what's the air quality like in London?"
              </p>
            </Card>
          </Rail>
        </Box>
      </Page>
    </>
  );
}
