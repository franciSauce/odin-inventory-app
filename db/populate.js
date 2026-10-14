const { Client } = require('pg');
const { argv, exit, env } = require('node:process');
const { CONNECTION_STRING } = env;
require('dotenv').config();

const DESCRIPTIONS = {
    kiichi: 'Left to himself at an early age in the slummiest parts of today’s Japan, Kiichi learns how to survive on his own. As a teenager, how can he adapt to a society whose rules he rejects? Unless he creates his own rules… Kiichi, a raw icon of strength and integrity, stands alone against the world’s injustice and becomes an unforgettable character.',
    no5: `
        A science-fiction thriller set in a powerfully imagined multicultural future landscape that resembles the current Middle East, NO. 5 is the latest work from the acclaimed creator of BLACK & WHITE, Taiyo Matsumoto.

        No. 5 battles against the forces of the Rainbow Council. In a world that has become 70% harsh desert, the Rainbow Council of the International Peace Keeping Forces, a team of super-powered global security guardians, have a growing crisis on their hands. No. 5, one of their own and known within the council as their top marksman, has left his post and gone rogue.

        It's up to the other guardians to track him down--but No. 5, with his mysterious companion Matroshka, won't go down without a fight.
        `,
    bokugaya: `
        Although satisfied with his average lifestyle, Tobio Masubuchi wishes for a long and fun existence, hoping that nothing will get in his way. Alongside his good friends Sho Isami, Yuki "Maru" Maruyama, and Hidero "Paisen" Kosaka, the group passes each day worry free, doing as they please. But when delinquents from a neighboring school overhear Maru saying that they should die, their troubles begin.

        After being kidnapped and brutally assaulted, Maru is found by his friends, who are shocked to see what has been done to him. Angry, Tobio proposes that they take immediate revenge, and after deciding how they should do so, the four put their plan into action. But when what should have been just a prank turns deadly, Tobio's aspirations for an undisturbed life are shattered forever. 
       `,
}

