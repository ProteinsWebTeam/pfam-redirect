function switchPanel(element, target) {
  document
    .querySelectorAll(".fake-home .body nav ul a")
    ?.forEach((e) => e.classList.remove("current"));
  element.classList.add("current");
  document
    .querySelectorAll("section.content > section")
    ?.forEach((e) => e.classList.remove("current"));
  document.getElementById(target)?.classList.add("current");
}

const examples = {
  jump: ["Piwi", "Kazal", "EYA2_HUMAN", "1w9h", "329163"],
  seq: [
    `> Example from Pfam
MAGAASPCANGCGPSAPSDAEVVHLCRSLEVGTVMTLFYSKKSQRPERKTFQVKLETRQI
TWSRGADKIEGAIDIREIKEIRPGKTSRDFDRYQEDPAFRPDQSHCFVILYGMEFRLKTL
SLQATSEDEVNMWIRGLTWLMEDTLQAATPLQIERWLRKQFYSVDRNREDRISAKDLKNM
LSQVNYRVPNMRFLRERLTDLEQRTSDITYGQFAQLYRSLMYSAQKTMDLPFLEASALRA
GERPELCRVSLPEFQQFLLEYQGELWAVDRLQVQEFMLSFLRDPLREIEEPYFFLDEFVT
FLFSKENSIWNSQLDEVCPDTMNNPLSHYWISSSHNTYLTGDQFSSESSLEAYARCLRMG
CRCIELDCWDGPDGMPVIYHGHTLTTKIKFSDVLHTIKEHAFVASEYPVILSIEDHCSIA
QQRNMAQYFKKVLGDTLLTKPVDIAADGLPSPNQLKRKILIKHKKLAEGSAYEEVPTSVM
YSENDISNSIKNGILYLEDPVNHEWYPHYFVLTSSKIYYSEETSSDQGNEDEEEPKEASG
STELHSNEKWFHGKLGAGRDGRHIAERLLTEYCIETGAPDGSFLVRESETFVGDYTLSFW
RNGKVQHCRIHSRQDAGTPKFFLTDNLVFDSLYDLITHYQQVPLRCNEFEMRLSEPVPQT
NAHESKEWYHASLTRAQAEHMLMRVPRDGAFLVRKRNEPNSYAISFRAEGKIKHCRVQQE
GQTVMLGNSEFDSLVDLISYYEKHPLYRKMKLRYPINEEALEKIGTAEPDYGALYEGRNP
GFYVEANPMPTFKCAVKALFDYKAQREDELTFTKSAIIQNVEKQEGGWWRGDYGGKKQLW
FPSNYVEEMVSPAALEPEREHLDENSPLGDLLRGVLDVPACQIAVRPEGKNNRLFVFSIS
MASVAHWSLDVAADSQEELQDWVKKIREVAQTADARLTEGKMMERRKKIALELSELVVYC
RPVPFDEEKIGTERACYRDMSSFPETKAEKYVNKAKGKKFLQYNRLQLSRIYPKGQRLDS
SNYDPLPMWICGSQLVALNFQTPDKPMQMNQALFLAGGHCGYVLQPSVMRDEAFDPFDKS
SLRGLEPCAICIEVLGARHLPKNGRGIVCPFVEIEVAGAEYDSIKQKTEFVVDNGLNPVW
PAKPFHFQISNPEFAFLRFVVYEEDMFSDQNFLAQATFPVKGLKTGYRAVPLKNNYSEGL
ELASLLVKIDVFPAKQENGDLSPFGGASLRERSCDASGPLFHGRAREGSFEARYQQPFED
FRISQEHLADHFDGRDRRTPRRTRVNGDNRL`,
  ],
  family: ["PF02171", "PF00001"],
  clan: ["CL0001", "CL0005"],
  protein: ["P99999", "P15498"],
  structure: ["1cuk", "2abl"],
  keyword: ["kinase", "apoptosis"],
};
const current = {
  jump: 0,
  seq: 0,
  family: 0,
  clan: 0,
  protein: 0,
  structure: 0,
  keyword: 0,
};
function setExample(type) {
  current[type]++;
  if (current[type] >= examples[type].length) current[type] = 0;
  const input = document.getElementById(`${type}Input`);
  if (input) {
    input.value = examples[type][current[type]];
  }
}

function searchInterPro(type) {
  const term = document.getElementById(`${type}Input`)?.value || "";
  window.location.href = `https://www.ebi.ac.uk/interpro/search/text/${term}`;
}
function sequenceSearchInterPro() {
  const seq = document.getElementById(`seqInput`)?.value || "";
  window.location.href = `https://www.ebi.ac.uk/interpro/search/sequence/${encodeURI(
    seq
  )}`;
}
function entryInterPro() {
  const term = document.getElementById(`familyInput`)?.value || "";
  window.location.href = `https://www.ebi.ac.uk/interpro/entry/pfam/${term}`;
}
function setInterPro() {
  const term = document.getElementById(`setInput`)?.value || "";
  window.location.href = `https://www.ebi.ac.uk/interpro/set/pfam/${term}`;
}
function proteinInterPro() {
  const term = document.getElementById(`proteinInput`)?.value || "";
  window.location.href = `https://www.ebi.ac.uk/interpro/protein/uniprot/${term}`;
}
function structureInterPro() {
  const term = document.getElementById(`structureInput`)?.value || "";
  window.location.href = `https://www.ebi.ac.uk/interpro/structure/pdb/${term}`;
}
