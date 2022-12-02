import useCards from "./useCards"

const creditTimings = [
    new Date(2022, 11, 1, 4),
    new Date(2022, 11, 2, 4),
    new Date(2022, 11, 3, 4),
    new Date(2022, 11, 4, 4),
    new Date(2022, 11, 5, 4),
    new Date(2022, 11, 6, 4),
    new Date(2022, 11, 7, 4),
    new Date(2022, 11, 8, 4),
    new Date(2022, 11, 9, 4),
    new Date(2022, 11, 10, 4),
    new Date(2022, 11, 11, 4),
    new Date(2022, 11, 12, 4),
    new Date(2022, 11, 13, 4),
    new Date(2022, 11, 14, 4),
    new Date(2022, 11, 15, 4),
    new Date(2022, 11, 16, 4),
    new Date(2022, 11, 17, 4),
    new Date(2022, 11, 18, 4),
    new Date(2022, 11, 19, 4),
    new Date(2022, 11, 20, 4),
    new Date(2022, 11, 21, 4),
    new Date(2022, 11, 22, 4),
    new Date(2022, 11, 23, 4),
    new Date(2022, 11, 24, 4),
    new Date(2022, 11, 25, 4),
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