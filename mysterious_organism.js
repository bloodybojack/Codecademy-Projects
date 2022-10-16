// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  function pAequorFactory(num, array) {
    const newSpecimen = {
      specimenNum: num,
      dna: array,
  
      mutate: function () {
        const randomNum = Math.floor(Math.random() * this.dna.length);
        let randomBase = this.dna[randomNum];
        let newBase = returnRandBase();
  
        if (newBase === randomBase) {
          while (newBase === randomBase) {
            newBase = returnRandBase();
          }
        }
  
        this.dna[randomNum] = newBase;
        return this.dna;
      },
  
      compareDNA: function (pAequor) {
        let commonBase = 0;
        for (let element in pAequor.dna) {
          if (pAequor.dna[element] === this.dna[element]) {
            commonBase++;
          }
        }
        const percentage = Math.floor(
          ((this.dna.length - commonBase) / this.dna.length) * 100
        );
        console.log(
          `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% of their DNA in common.`
        );
      },
  
      willLikelySurvive: function () {
        let favorableDNA = 0;
        for (let element of this.dna) {
          if (element === "C" || element === "G") {
            favorableDNA++;
          }
        }
        const percentage = Math.floor(
          ((this.dna.length - favorableDNA) / this.dna.length) * 100
        );
        return percentage >= 60 ? true : false;
      },
    };
    return newSpecimen;
  }
  
  const strongSpecimens = [];
  let specimens = 0;
  while (strongSpecimens.length < 30) {
    let newSpecimen = null;
    newSpecimen = pAequorFactory(specimens, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
      strongSpecimens.push(newSpecimen);
    }
    specimens++;
  }
  
  console.log(
    `It took generating ${specimens} specimens, but we finally have ${strongSpecimens.length} strong P.aequor instances.`
  );
  