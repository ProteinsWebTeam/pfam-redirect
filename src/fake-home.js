import {
  pfamAccessionRegex,
  clanAccessionRegex,
  pdbAccessionRegex,
  uniprotAccessionRegex,
} from "./get-new-url";

export function switchPanel(element, target) {
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
export function setExample(type) {
  current[type]++;
  if (current[type] >= examples[type].length) current[type] = 0;
  const input = document.getElementById(`${type}Input`);
  if (input) {
    input.value = examples[type][current[type]];
  }
}

export function go(type) {
  const value = document.getElementById(`${type}Input`)?.value || "";
  let url = "";
  switch (type) {
    case "family":
      if (pfamAccessionRegex.test(value)) {
        url = `https://www.ebi.ac.uk/interpro/entry/pfam/${value}`;
      }
      break;
    case "clan":
      if (clanAccessionRegex.test(value)) {
        url = `https://www.ebi.ac.uk/interpro/set/pfam/${value}`;
      }
      break;
    case "protein":
      if (uniprotAccessionRegex.test(value)) {
        url = `https://www.ebi.ac.uk/interpro/protein/uniprot/${value}`;
      }
      break;
    case "structure":
      if (pdbAccessionRegex.test(value)) {
        url = `https://www.ebi.ac.uk/interpro/structure/pdb/${value}`;
      }
      break;
    case "seq":
      url = `https://www.ebi.ac.uk/interpro/search/sequence/${encodeURI(
        value
      )}`;
      break;
  }
  // for 'jump', 'keyword', and any other that didn't match their regex
  if (!url) {
    url = `https://www.ebi.ac.uk/interpro/search/text/${value}`;
  }
  window.location.href = url;
}
