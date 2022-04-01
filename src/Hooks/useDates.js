import useCards from "./useCards"

const creditTimings = [ 
    new Date(2022, 2, 26, 12),
    new Date(2022, 2, 27, 17),
    new Date(2022, 2, 28, 17),
    new Date(2022, 2, 29, 17),
    new Date(2022, 2, 30, 17),
    new Date(2022, 2, 31, 17),
    new Date(2022, 3, 1, 12),
    new Date(2022, 3, 1, 17),
    new Date(2022, 3, 2, 17),
    new Date(2022, 3, 3, 5),
];

function useDates(){
    const { data } = useCards()

    function numCredits() {
        if (data.length === 0)
          return "?"
        let creditsGiven = creditTimings.findIndex((date) => date - Date.now() > 0)
        creditsGiven = creditsGiven < 0 ? creditTimings.length : creditsGiven;
        const creditsUsed = data.filter(i => i.visible).length
        return creditsGiven - creditsUsed;
    }

    function nextCredit() {
        return creditTimings.find((date) => date - Date.now() > 0)
    }

    function enoughCredits(){
        return numCredits() > 0
    }

    function allCreditsUsed(){
        return nextCredit() === undefined && numCredits() === 0;
    }

    return {numCredits, nextCredit, enoughCredits, allCreditsUsed}
}

export default useDates