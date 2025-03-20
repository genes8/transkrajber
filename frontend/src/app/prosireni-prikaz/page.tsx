"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaArrowLeft, FaDownload, FaPrint, FaSearch, FaQuestion } from "react-icons/fa";

export default function ProsireniPrikaz() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const [transkript, setTranskript] = useState<string>("");
  const [snimakInfo, setSnimakInfo] = useState<{
    naziv: string;
    datum: string;
    duzina: string;
  } | null>(null);
  
  // Stanja za chat funkcionalnost
  const [chatQuery, setChatQuery] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("transkript");

  // Učitavanje podataka iz localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        // Učitavamo podatke iz localStorage
        const storedData = localStorage.getItem('transkrajber_snimak');
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          
          // Postavljamo informacije o snimku
          if (parsedData.naziv && parsedData.datum && parsedData.duzina) {
            setSnimakInfo({
              naziv: parsedData.naziv,
              datum: parsedData.datum,
              duzina: parsedData.duzina
            });
          }
          
          // Postavljamo transkript
          if (parsedData.transkript) {
            setTranskript(parsedData.transkript);
          }
        } else {
          // Ako nema podataka u localStorage, proveravamo URL parametre (za kompatibilnost)
          const naziv = searchParams.get("naziv");
          const datum = searchParams.get("datum");
          const duzina = searchParams.get("duzina");
          const transkriptParam = searchParams.get("transkript");

          if (naziv && datum && duzina) {
            setSnimakInfo({
              naziv: decodeURIComponent(naziv),
              datum: decodeURIComponent(datum),
              duzina: decodeURIComponent(duzina)
            });
          }

          if (transkriptParam) {
            setTranskript(decodeURIComponent(transkriptParam));
          } else {
            // Primer transkripta ako nije prosleđen
            setTranskript(`
[00:00:05] Marko: Dobrodošli na naš sastanak o novom projektu za razvoj mobilne aplikacije. Danas ćemo razgovarati o ključnim funkcionalnostima i rokovima.
[00:00:18] Ana: Hvala Marko. Pre nego što počnemo, da li možemo da prođemo kroz zahteve klijenta koje smo dobili prošle nedelje?
[00:00:30] Marko: Naravno. Klijent želi aplikaciju za praćenje fizičke aktivnosti sa integracijom društvenih mreža. Glavne funkcionalnosti uključuju praćenje koraka, kalorija, i povezivanje sa prijateljima.
[00:01:05] Nikola: Da li znamo koji je njihov budžet za ovaj projekat? To će uticati na to koliko kompleksne funkcionalnosti možemo da implementiramo.
[00:01:20] Marko: Budžet je oko 25.000 evra, što bi trebalo da bude dovoljno za osnovne funkcionalnosti i nekoliko naprednih opcija.
[00:01:45] Ana: Koji je rok za završetak projekta? Moramo da budemo realni u proceni vremena potrebnog za razvoj.
[00:02:00] Marko: Klijent želi prvu verziju za 3 meseca, a finalnu verziju za 6 meseci od danas.
[00:02:15] Nikola: To je prilično ambiciozan rok. Da li imamo resurse za to? Trebaće nam barem dva iOS developera i dva Android developera.
[00:02:35] Ana: Slažem se sa Nikolom. Takođe, trebaće nam i backend developer i neko ko će raditi na dizajnu korisničkog interfejsa.
[00:03:00] Marko: Trenutno imamo dva iOS developera, jednog Android developera, i jednog backend developera. Moraćemo da zaposlimo još jednog Android developera i UI/UX dizajnera.
[00:03:30] Nikola: Šta je sa testiranjem? Ne smemo da zanemarimo QA proces.
[00:03:45] Marko: Dobar point. Angažovaćemo i QA inženjera na pola radnog vremena.
[00:04:10] Ana: Koje tehnologije ćemo koristiti za razvoj? Da li idemo sa nativnim razvojem ili ćemo koristiti cross-platform rešenje?
[00:04:30] Marko: S obzirom na zahteve klijenta za performansama, mislim da je bolje da idemo sa nativnim razvojem. Swift za iOS i Kotlin za Android.
[00:05:00] Nikola: A za backend? Predlažem da koristimo Node.js sa Express frameworkom i MongoDB za bazu podataka.
[00:05:20] Ana: To zvuči razumno. Takođe, moramo da razmislimo o infrastrukturi. Da li ćemo koristiti AWS ili neki drugi cloud provider?
[00:05:40] Marko: Koristićemo AWS, pošto već imamo iskustva sa njihovim servisima. Koristićemo EC2 instance za hosting i S3 za skladištenje podataka.
[00:06:10] Nikola: Šta je sa analitikom? Klijent će sigurno želeti da prati korišćenje aplikacije.
[00:06:25] Marko: Implementiraćemo Google Analytics i Firebase za praćenje korisničkog ponašanja.
[00:06:45] Ana: Moramo da razmislimo i o bezbednosti. Aplikacija će prikupljati lične podatke korisnika, pa moramo da osiguramo da su ti podaci zaštićeni.
[00:07:10] Marko: Apsolutno. Implementiraćemo OAuth 2.0 za autentifikaciju i enkripciju za zaštitu podataka.
[00:07:35] Nikola: Kada možemo da počnemo sa razvojem? Da li imamo sve potrebne informacije?
[00:07:50] Marko: Mislim da možemo da počnemo sledeće nedelje. Do tada ću pripremiti detaljnu specifikaciju projekta i podeliti je sa svima.
[00:08:15] Ana: Zvuči dobro. Takođe, predlažem da organizujemo nedeljne sastanke za praćenje napretka.
[00:08:30] Marko: Slažem se. Zakazaću sastanke za svaki ponedeljak u 10h. Ako nema drugih pitanja, mislim da možemo da završimo sastanak.
[00:08:50] Nikola: Nemam više pitanja. Hvala svima na učešću.
[00:09:00] Ana: Hvala. Radujem se saradnji na ovom projektu.
[00:09:10] Marko: Hvala svima. Vidimo se sledeće nedelje.
            `);
          }
        }
      } catch (error) {
        console.error("Greška pri učitavanju podataka:", error);
      }
    };
    
    loadData();
  }, [searchParams]);

  // Funkcija za formatiranje transkripta
  const formatiraniTranskript = () => {
    if (!transkript) return [];
    
    return transkript.split('\n').filter(line => line.trim()).map((line, index) => {
      // Izdvajamo vreme, govornika i tekst
      const match = line.match(/\[(\d{2}:\d{2}:\d{2})\] ([^:]+): (.+)/);
      if (!match) return { id: index, time: "", speaker: "", text: line };
      
      const [time, speaker, text] = match;
      return { id: index, time, speaker, text };
    });
  };

  // Funkcija za chat sa transkriptom
  const chatWithTranscript = () => {
    if (!chatQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simuliramo AI odgovor na osnovu transkripta
    setTimeout(() => {
      let response = "";
      const query = chatQuery.toLowerCase();
      
      // Jednostavna logika za generisanje odgovora na osnovu upita
      if (query.includes("budžet") || query.includes("budzet")) {
        response = "<p class=\"mb-2 font-semibold\">Budžet za projekat je oko 25.000 evra, što bi trebalo da bude dovoljno za osnovne funkcionalnosti i nekoliko naprednih opcija.</p>";
      } else if (query.includes("rok")) {
        response = "<p class=\"mb-2 font-semibold\">Klijent želi prvu verziju za 3 meseca, a finalnu verziju za 6 meseci.</p>";
      } else if (query.includes("tehnologij")) {
        response = "<p class=\"mb-2 font-semibold\">Za razvoj će se koristiti:</p><ul class=\"list-disc pl-5 space-y-1\"><li>Swift za iOS</li><li>Kotlin za Android</li><li>Node.js sa Express frameworkom i MongoDB za backend</li><li>AWS za infrastrukturu</li></ul>";
      } else if (query.includes("tim") || query.includes("developer")) {
        response = "<p class=\"mb-2 font-semibold\">Tim će se sastojati od:</p><ul class=\"list-disc pl-5 space-y-1\"><li>Dva iOS developera</li><li>Dva Android developera</li><li>Jedan backend developer</li><li>UI/UX dizajner</li><li>QA inženjer na pola radnog vremena</li></ul>";
      } else if (query.includes("sastanak") || query.includes("sastanci")) {
        response = "<p class=\"mb-2 font-semibold\">Nedeljni sastanci za praćenje napretka biće organizovani svakog ponedeljka u 10h.</p>";
      } else if (query.includes("bezbednost") || query.includes("sigurnost")) {
        response = "<p class=\"mb-2 font-semibold\">Za bezbednost će se implementirati OAuth 2.0 za autentifikaciju i enkripcija za zaštitu podataka korisnika.</p>";
      } else if (query.includes("analitik")) {
        response = "<p class=\"mb-2 font-semibold\">Za analitiku će se koristiti Google Analytics i Firebase za praćenje korisničkog ponašanja.</p>";
      } else if (query.includes("funkcionalnost")) {
        response = "<p class=\"mb-2 font-semibold\">Glavne funkcionalnosti aplikacije uključuju:</p><ul class=\"list-disc pl-5 space-y-1\"><li>Praćenje koraka</li><li>Praćenje kalorija</li><li>Povezivanje sa prijateljima</li><li>Integracija sa društvenim mrežama</li></ul>";
      } else {
        response = "<p class=\"text-gray-700\">Nisam pronašao specifične informacije o tome u transkriptu. Možete postaviti konkretnije pitanje ili pitati o budžetu, rokovima, tehnologijama, timu ili funkcionalnostima.</p>";
      }
      
      setChatResponse(response);
      setIsSearching(false);
    }, 1000);
  };
  
  // Funkcija za sumiranje transkripta
  const summarizeTranscript = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      const summary = `<p class="mb-2 text-gray-900 font-semibold"><strong>Sažetak sastanka:</strong></p>
      <ul class="list-disc pl-5 space-y-1 text-gray-900">
        <li>Projekat: Razvoj mobilne aplikacije za praćenje fizičke aktivnosti sa integracijom društvenih mreža</li>
        <li>Budžet: 25.000 evra</li>
        <li>Rokovi: Prva verzija za 3 meseca, finalna verzija za 6 meseci</li>
        <li>Tim: 2 iOS developera, 2 Android developera, 1 backend developer, 1 UI/UX dizajner, 1 QA inženjer (pola radnog vremena)</li>
        <li>Tehnologije: Swift (iOS), Kotlin (Android), Node.js sa Express i MongoDB (backend), AWS (infrastruktura)</li>
        <li>Dodatno: Implementacija Google Analytics, Firebase, OAuth 2.0 za bezbednost</li>
        <li>Sledeći koraci: Detaljna specifikacija projekta sledeće nedelje, nedeljni sastanci ponedeljkom u 10h</li>
      </ul>`;
      
      setChatResponse(summary);
      setIsSearching(false);
    }, 1500);
  };
  
  // Funkcija za izvlačenje ključnih tačaka
  const extractKeyPoints = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      const keyPoints = `<p class="mb-2 text-gray-900 font-semibold"><strong>Ključne tačke:</strong></p>
      <ul class="list-disc pl-5 space-y-1 text-gray-900">
        <li>Aplikacija za praćenje fizičke aktivnosti sa društvenim funkcijama</li>
        <li>Budžet od 25.000 evra</li>
        <li>Rok za prvu verziju: 3 meseca</li>
        <li>Potrebno zaposliti još jednog Android developera i UI/UX dizajnera</li>
        <li>Koristiće se nativni razvoj umesto cross-platform rešenja</li>
        <li>AWS infrastruktura za hosting i skladištenje</li>
        <li>Poseban fokus na bezbednost ličnih podataka</li>
      </ul>`;
      
      setChatResponse(keyPoints);
      setIsSearching(false);
    }, 1200);
  };
  
  // Funkcija za pronalaženje akcionih stavki
  const findActionItems = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      const actionItems = `<p class="mb-2 text-gray-900 font-semibold"><strong>Akcione stavke:</strong></p>
      <ul class="list-disc pl-5 space-y-1 text-gray-900">
        <li>Marko: Pripremiti detaljnu specifikaciju projekta do sledeće nedelje</li>
        <li>Marko: Zakazati nedeljne sastanke ponedeljkom u 10h</li>
        <li>Tim: Zaposliti još jednog Android developera</li>
        <li>Tim: Zaposliti UI/UX dizajnera</li>
        <li>Tim: Angažovati QA inženjera na pola radnog vremena</li>
        <li>Svi: Početak razvoja sledeće nedelje</li>
      </ul>`;
      
      setChatResponse(actionItems);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center text-gray-600 hover:text-gray-900"
              data-component-name="ProsireniPrikaz"
            >
              <FaArrowLeft className="mr-2" />
              Nazad
            </button>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                <FaDownload className="mr-2" />
                Preuzmi
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
                <FaPrint className="mr-2" />
                Štampaj
              </button>
            </div>
          </div>
        </div>
        
        {/* Glavni sadržaj */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          {snimakInfo && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{snimakInfo.naziv}</h1>
              <p className="text-gray-600">{snimakInfo.datum} • {snimakInfo.duzina}</p>
            </div>
          )}
          
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("transkript")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "transkript" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                Transkript
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "chat" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                Chat i Analiza
              </button>
            </nav>
          </div>
          
          {activeTab === "transkript" && (
            <div className="space-y-4">
              {formatiraniTranskript().map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start">
                    {item.time && (
                      <div className="text-sm font-medium text-gray-500 mr-3 w-16 flex-shrink-0">
                        [{item.time}]
                      </div>
                    )}
                    {item.speaker && (
                      <div className="font-semibold text-blue-700 mr-2 w-20 flex-shrink-0">
                        {item.speaker}:
                      </div>
                    )}
                    <div className="text-gray-800 flex-1">
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "chat" && (
            <div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b border-blue-100 flex items-center">
                  <FaQuestion className="h-4 w-4 mr-2 text-blue-500" />
                  Chat sa transkriptom
                </h4>
                
                <div className="mb-4">
                  <div className="flex">
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium" 
                      placeholder="Postavite pitanje..."
                      value={chatQuery}
                      onChange={(e) => setChatQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && chatWithTranscript()}
                    />
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors duration-200"
                      onClick={chatWithTranscript}
                    >
                      Pitaj
                    </button>
                  </div>
                  
                  <div className="flex mt-2 text-sm space-x-2">
                    <button 
                      className="px-2 py-1 bg-white hover:bg-gray-100 rounded-md text-gray-700 transition-colors border border-gray-200"
                      onClick={summarizeTranscript}
                    >
                      Sumiraj transkript
                    </button>
                    <button 
                      className="px-2 py-1 bg-white hover:bg-gray-100 rounded-md text-gray-700 transition-colors border border-gray-200"
                      onClick={extractKeyPoints}
                    >
                      Izvuci ključne tačke
                    </button>
                    <button 
                      className="px-2 py-1 bg-white hover:bg-gray-100 rounded-md text-gray-700 transition-colors border border-gray-200"
                      onClick={findActionItems}
                    >
                      Pronađi stavke
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200 text-gray-900 min-h-[200px]">
                  {isSearching ? (
                    <div className="flex justify-center items-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2 text-gray-600">Obrađujem...</span>
                    </div>
                  ) : chatResponse ? (
                    <div className="max-h-[400px] overflow-y-auto">
                      <div dangerouslySetInnerHTML={{ __html: chatResponse }} />
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">Postavite pitanje o transkriptu da dobijete rezultate...</p>
                  )}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
                <h4 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b border-green-100 flex items-center">
                  <FaSearch className="h-4 w-4 mr-2 text-green-500" />
                  Pretraga transkripta
                </h4>
                
                <div className="mb-4">
                  <div className="flex">
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium" 
                      placeholder="Unesite reč ili frazu za pretragu..."
                    />
                    <button 
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md transition-colors duration-200"
                    >
                      Pretraži
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200 text-gray-900 min-h-[100px]">
                  <p className="text-gray-500 text-sm italic">Rezultati pretrage će biti prikazani ovde...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
