var e;e=JSON.parse('{"basepath":"?","interproURL":"https://www.ebi.ac.uk/interpro","legacyURL":"http://pfamdev-legacy.xfam.org","test":true}');const t=/pf\d{5}/i,a=/cl\d{4}/i,r=/[a-zA-Z\d]{4}/i,s=/[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}/i;let n=9,o=!0;const c=setInterval((()=>{o&&(n=Math.max(n-1,0),document.querySelectorAll(".sec-left").forEach((e=>e.innerHTML=n)),0===n&&(e.test?console.log(h):window.location.replace(h),clearInterval(c)))}),1e3),i=new URL(document.location.href);let p=i.pathname;i.pathname.startsWith(e.basepath)?p=i.pathname.slice(e.basepath.length):"?"===e.basepath?p=i.search.slice(2):console.error("the pathname doesn't start with the given base path");const l=p.split("/");let h=null;switch(l[0].toLowerCase()){case"family":t.test(l?.[1])?h=`${e.interproURL}/entry/pfam/${l[1]}`:"browse"===l?.[1]&&(h=`${e.interproURL}/entry/pfam/`);break;case"protein":s.test(l[1])&&(h=`${e.interproURL}/protein/uniprot/${l[1]}`);break;case"clan":a.test(l[1])?h=`${e.interproURL}/set/pfam/${l[1]}`:"browse"===l?.[1]&&(h=`${e.interproURL}/set/pfam/`);break;case"proteome":!l?.[1]&&i.searchParams.get("taxId")?h=`${e.interproURL}/taxonomy/uniprot/${i.searchParams.get("taxId")}/entry/pfam/`:"browse"===l?.[1]&&(h=`${e.interproURL}/taxonomy/uniprot/entry/pfam/`);break;case"structure":r.test(l[1])&&(h=`${e.interproURL}/structure/pdb/${l[1]}`);break;case"browse":h=`${e.interproURL}/entry/pfam`;break;case"search":switch(i.hash){case"#tabview=tab0":case"#searchDomainBlock":h=`${e.interproURL}/search/sequence/`;break;case"#tabview=tab2":case"#searchKeywordBlock":h=`${e.interproURL}/search/text/`;break;case"#tabview=tab3":case"#searchDomainBlock":h=`${e.interproURL}/search/ida/`;break;case"#tabview=tab":case"#searchTaxBlock":h=`${e.interproURL}/taxonomy/uniprot/entry/pfam/`}}null===h&&(h=l?.[1]?`${e.interproURL}/search/text/${l[1]}`:e.interproURL);const m=document.getElementById("countdown");m.addEventListener("click",(()=>{o=!o,o?m.classList.remove("paused"):m.classList.add("paused")}));const b=document.getElementById("linkToInterPro");b.setAttribute("href",h),b.innerHTML=h;const L=`${e.legacyURL}/${p}${i.search??""}`,d=document.getElementById("linkToLegacy");d.setAttribute("href",L),d.innerHTML=L;
//# sourceMappingURL=index.c6e299e3.js.map
