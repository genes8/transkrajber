"use client";

import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaFolder, FaSearch, FaQuestion, FaPause} from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("record");
  // eslint-disable  @typescript-eslint/no-explicit-any
  const [transcriptionData] = useState<any | null>(null);
  // eslint-disable  @typescript-eslint/no-explicit-any
  const [selectedSnimak, setSelectedSnimak] = useState<any | null>(null);
  const [showSnimakDetails, setShowSnimakDetails] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordingStatus, setRecordingStatus] = useState<'stopped' | 'recording' | 'paused'>('stopped');
  const snimanjeDivRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Dodajemo stanja za chat i pretragu
  // const [searchQuery] = useState<string>("");
  const [chatQuery, setChatQuery] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<string>("");
  const [searchResults] = useState<Array<{id: number, time: string, content: string}>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  // Funkcija za formatiranje vremena (sekunde u format MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Funkcija za upravljanje snimanjem
  const handleRecordingToggle = () => {
    if (recordingStatus === 'stopped') {
      // Započinjemo snimanje
      setRecordingStatus('recording');
      setRecordingTime(0);
      // Pokrećemo tajmer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (recordingStatus === 'recording') {
      // Pauziramo snimanje
      setRecordingStatus('paused');
      // Zaustavljamo tajmer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else {
      // Nastavljamo snimanje
      setRecordingStatus('recording');
      // Ponovo pokrećemo tajmer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  // Funkcija za zaustavljanje snimanja
  const stopRecording = () => {
    setRecordingStatus('stopped');
    // Zaustavljamo tajmer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Ovde bismo mogli da sačuvamo snimak ili uradimo nešto drugo sa njim
    // Za sada samo resetujemo vreme
    setRecordingTime(0);
  };

  // Čistimo tajmer kada se komponenta unmount-uje
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Primer realističnog transkripta sa više govornika
  const [transkript] = useState<string>(`
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
  
  // Dodajemo mock podatke za prikaz
  const mockSnimci = [
    {
      id: 1,
      naziv: 'Sastanak o razvoju mobilne aplikacije',
      datum: '2024-03-18',
      duzina: '15:23',
      status: 'Obradjeno'
    },
    {
      id: 2,
      naziv: 'Podkast epizoda',
      datum: '2024-03-17',
      duzina: '45:12',
      status: 'U obradi'
    }
  ];

  // Simuliramo uspešno otpremanje
  const [snimci] = useState(mockSnimci);
  
  // Funkcija za pretragu transkripta
  // const searchTranscript = () => {
  //   if (!searchQuery.trim()) return;
    
  //   setIsSearching(true);
    
  //   // Simuliramo pretragu u transkriptu
  //   setTimeout(() => {
  //     const query = searchQuery.toLowerCase();
  //     const lines = transkript.split('\n').filter(line => line.trim());
      
  //     const results = lines.filter(line => 
  //       line.toLowerCase().includes(query)
  //     ).map((line, index) => {
  //       const timeMatch = line.match(/\[(\d{2}:\d{2}:\d{2})\]/);
  //       const time = timeMatch ? timeMatch[1] : "";
        
  //       // Označavamo pronađeni tekst
  //       const highlightedLine = line.replace(
  //         new RegExp(query, 'gi'), 
  //         match => `<mark class="bg-yellow-200">${match}</mark>`
  //       );
        
  //       return { id: index, time, content: highlightedLine };
  //     });
      
  //     setSearchResults(results);
  //     setIsSearching(false);
  //   }, 500); // Simuliramo malo kašnjenje kao u pravoj pretrazi
  // };
  
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
        response = "Budžet za projekat je oko 25.000 evra, što bi trebalo da bude dovoljno za osnovne funkcionalnosti i nekoliko naprednih opcija.";
      } else if (query.includes("rok")) {
        response = "Klijent želi prvu verziju za 3 meseca, a finalnu verziju za 6 meseci.";
      } else if (query.includes("tehnologij")) {
        response = "Za razvoj će se koristiti Swift za iOS, Kotlin za Android, Node.js sa Express frameworkom i MongoDB za backend, a infrastruktura će biti na AWS-u.";
      } else if (query.includes("tim") || query.includes("developer")) {
        response = "Tim će se sastojati od dva iOS developera, dva Android developera, jednog backend developera, UI/UX dizajnera i QA inženjera na pola radnog vremena.";
      } else if (query.includes("sastanak") || query.includes("sastanci")) {
        response = "Nedeljni sastanci za praćenje napretka biće organizovani svakog ponedeljka u 10h.";
      } else if (query.includes("bezbednost") || query.includes("sigurnost")) {
        response = "Za bezbednost će se implementirati OAuth 2.0 za autentifikaciju i enkripcija za zaštitu podataka korisnika.";
      } else if (query.includes("analitik")) {
        response = "Za analitiku će se koristiti Google Analytics i Firebase za praćenje korisničkog ponašanja.";
      } else if (query.includes("funkcionalnost")) {
        response = "Glavne funkcionalnosti aplikacije uključuju praćenje koraka, kalorija, i povezivanje sa prijateljima kroz integraciju društvenih mreža.";
      } else {
        response = "Na osnovu transkripta, ne mogu da pronađem specifičan odgovor na vaše pitanje. Pokušajte da preformulišete pitanje ili postavite konkretnije pitanje vezano za sastanak o razvoju mobilne aplikacije.";
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero sekcija */}
      <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-100 text-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Audio Transkrajber</h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-600">Pretvorite audio u tekst i analizirajte razgovore uz pomoć veštačke inteligencije</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => {
                    setActiveTab("record");
                    // Skroluj do sekcije sa mikrofonom nakon kratkog odlaganja
                    setTimeout(() => {
                      snimanjeDivRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }} 
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  data-component-name="Home"
                >
                  Započni snimanje
                </button>
                <a 
                  href="/uputstvo" 
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
                >
                  Korisničko uputstvo
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-100 rounded-lg transform rotate-12"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-indigo-100 rounded-lg transform -rotate-12"></div>
                <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-1 bg-blue-400 rounded"></div>
                    <div className="w-20 h-1 bg-indigo-400 rounded"></div>
                    <div className="w-8 h-1 bg-blue-300 rounded"></div>
                  </div>
                  <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-1 bg-indigo-300 rounded"></div>
                    <div className="w-10 h-1 bg-blue-400 rounded"></div>
                    <div className="w-24 h-1 bg-indigo-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glavni sadržaj */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-sm rounded-lg p-6">
          {/* Karakteristike aplikacije */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Mogućnosti aplikacije</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4 mx-auto">
                  <FaMicrophone className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Snimanje zvuka</h3>
                <p className="text-gray-600 text-center">Snimajte audio direktno kroz web aplikaciju bez potrebe za dodatnim softverom</p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600 mb-4 mx-auto">
                  <IoDocumentText className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Transkripcija</h3>
                <p className="text-gray-600 text-center">Automatsko pretvaranje govora u tekst sa visokom preciznošću</p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600 mb-4 mx-auto">
                  <FaSearch className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Analiza</h3>
                <p className="text-gray-600 text-center">Napredna analiza razgovora, sažimanje i odgovori na pitanja</p>
              </div>
            </div>
          </div>
          
          {/* Glavni interfejs */}
          <div>
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaMicrophone className="mr-3 text-blue-500" />
                Audio Transkribovanje i Analiza
              </h2>
            </header>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("record")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "record" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                Snimanje
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "upload" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                Otpremanje
              </button>
              <button
                onClick={() => setActiveTab("recordings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "recordings" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                Sačuvani Snimci
              </button>
              {transcriptionData && (
                <button
                  onClick={() => setActiveTab("transcription")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "transcription" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  Transkript
                </button>
              )}
              {transcriptionData && (
                <button
                  onClick={() => setActiveTab("analysis")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "analysis" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                >
                  Analiza
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            {activeTab === "record" && (
              <div ref={snimanjeDivRef} data-component-name="Home">
                <div className="text-center py-8" data-component-name="Home">
                  {/* Tajmer za snimanje */}
                  {recordingStatus !== 'stopped' && (
                    <div className="mb-4 text-xl font-semibold text-gray-700">
                      {formatTime(recordingTime)}
                    </div>
                  )}
                  
                  {/* Dugme za snimanje/pauziranje */}
                  <button 
                    className={`${recordingStatus === 'recording' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto transition-colors duration-200`}
                    onClick={() => handleRecordingToggle()}
                    data-component-name="Home"
                  >
                    {recordingStatus === 'recording' ? <FaPause size={32} /> : <FaMicrophone size={32} />}
                  </button>
                  <p className="mt-4 text-gray-600">
                    {recordingStatus === 'recording' ? 'Kliknite da pauzirate snimanje' : 
                     recordingStatus === 'paused' ? 'Kliknite da nastavite snimanje' : 
                     'Kliknite da započnete snimanje'}
                  </p>
                  
                  {/* Dugme za zaustavljanje snimanja */}
                  {recordingStatus !== 'stopped' && (
                    <button 
                      className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                      onClick={stopRecording}
                    >
                      Zaustavi snimanje
                    </button>
                  )}
                </div>
                
                <div className="mt-6 text-center text-gray-500 italic">
                  Još uvek nema snimljenog zvuka - koristite dugme mikrofona iznad
                </div>
                
                <div className="mt-8">
                  <div className="mb-4">
                    <label htmlFor="recording-name" className="block text-sm font-medium text-gray-900 mb-1">Naziv snimka</label>
                    <input 
                      type="text" 
                      id="recording-name" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600 text-gray-900" 
                      data-component-name="Home"
                      placeholder="Unesite naziv za ovaj snimak"
                    />
                  </div>
                  
                  <button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    Sačuvaj Snimak
                  </button>
                </div>
              </div>
            )}

            {activeTab === "upload" && (
              <div className="py-12 text-center">
                <div className="max-w-xl mx-auto">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <FaFolder className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                          <span>Otpremite fajl</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".wav" />
                        </label>
                        <p className="pl-1">ili prevucite i otpustite</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">WAV fajlovi do 50MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "recordings" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                  <FaFolder className="mr-2 text-blue-500" />
                  Sačuvani Snimci
                </h3>
                
                <div className="border-t border-gray-200">
                  <div className="py-6 text-center text-gray-500">
                    {/* Primer sačuvanog snimka (zakomentarisan) */}
                    {/* 
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Intervju sa klijentom</h4>
                        <p className="text-sm text-gray-500">15. mart 2025, 14:30</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Pusti</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Obriši</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium">
                          Transkribuj
                        </button>
                      </div>
                    </div>
                    */}
                    {/* Dodajemo sekciju sa listom snimaka */}
                    <section className='mt-8'>
                      <h2 className='text-xl font-semibold mb-4'>Sačuvani snimci</h2>
                      <div className='space-y-4'>
                        {snimci.map((snimak) => (
                          <div 
                            key={snimak.id}
                            className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer'
                            onClick={() => {
                              setSelectedSnimak(snimak);
                              setShowSnimakDetails(true);
                            }}
                          >
                            <div className='flex justify-between items-start'>
                              <div>
                                <h3 className='font-medium'>{snimak.naziv}</h3>
                                <p className='text-sm text-gray-600'>{snimak.datum} • {snimak.duzina}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                snimak.status === 'Obradjeno' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {snimak.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transcription" && transcriptionData && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <IoDocumentText className="mr-2 text-blue-500" />
                    Transkript
                  </h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Word
                    </button>
                    <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Excel
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  {/* Primer transkripta (zakomentarisan) */}
                  {/* 
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-medium mr-3 flex-shrink-0">
                        G1
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">00:00:15</div>
                        <p className="text-gray-800">Zdravo, hvala vam što ste odvojili vreme za ovaj razgovor. Možete li mi reći nešto više o vašim potrebama?</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-medium mr-3 flex-shrink-0">
                        G2
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">00:00:32</div>
                        <p className="text-gray-800">Naravno, tražimo rešenje za automatizaciju našeg procesa transkribovanja. Trenutno to radimo ručno i oduzima nam mnogo vremena.</p>
                      </div>
                    </div>
                  </div>
                  */}
                  
                  <div className="text-center py-8 text-gray-500">
                    {'Nema dostupnog transkripta. Izaberite snimak i kliknite na "Transkribuj" da generišete transkript.'}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analysis" && transcriptionData && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center mb-6">
                  <FaSearch className="mr-2 text-blue-500" />
                  Analiza Razgovora
                </h3>
                
                <div className="mb-8">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200">
                    Sumiraj
                  </button>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 italic">Sumarizacija će biti prikazana ovde nakon generisanja...</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-800 flex items-center mb-4">
                    <FaQuestion className="mr-2 text-blue-500" />
                    Postavite Pitanje
                  </h4>
                  
                  <div className="flex">
                    <input 
                      type="text" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Unesite pitanje o razgovoru"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors duration-200">
                      Traži Odgovor
                    </button>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 italic">Odgovori će biti prikazani ovde...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      {/* Modal za prikaz detalja snimka */}
      {showSnimakDetails && selectedSnimak && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedSnimak.naziv}</h2>
                <p className="text-gray-700">{selectedSnimak.datum} • {selectedSnimak.duzina}</p>
              </div>
              <button 
                onClick={() => setShowSnimakDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center py-8">
                <div className="w-full max-w-md">
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-1/3"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>0:00</span>
                    <span>{selectedSnimak.duzina}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6">
                <button className="p-3 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </button>
                <button className="p-3 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {selectedSnimak.status === 'Obradjeno' ? (
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Leva kolona - Transkript */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Transkript</h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto shadow-sm" data-component-name="Home">
                      <div className="text-gray-700" data-component-name="Home">
                        {transkript.split('\n').filter((line: string) => line.trim()).map((line: string, index: number) => {
                          // Izdvajamo vreme, govornika i tekst
                          const match = line.match(/\[(\d{2}:\d{2}:\d{2})\] ([^:]+): (.+)/);
                          if (!match) return null;
                          
                          const [time, speaker, text] = match;
                          
                          return (
                            <div key={index} className="mb-2 pb-2 border-b border-gray-100 last:border-0">
                              <span className="text-xs font-medium text-gray-500 mr-2">[{time}]</span>
                              <span className="font-semibold text-blue-700">{speaker}:</span>
                              <span className="ml-1">{text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Desna kolona - Chat */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analiza Transkripta</h3>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                      <h4 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b border-blue-100 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Chat sa transkriptom
                      </h4>
                      
                      <div className="mb-4">
                        <div className="flex">
                          <input 
                            type="text" 
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium" 
                            placeholder="Postavite pitanje..."
                            data-component-name="Home"
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
                      
                      <div className="bg-white p-3 rounded-md border border-gray-200 text-gray-900 font-medium min-h-[150px]">
                        {isSearching ? (
                          <div className="flex justify-center items-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <span className="ml-2 text-gray-600">Obrađujem...</span>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="max-h-40 overflow-y-auto">
                            <h5 className="font-medium text-gray-800 mb-2">Rezultati pretrage:</h5>
                            {searchResults.map((result) => (
                              <div key={result.id} className="mb-2 pb-2 border-b border-gray-100 last:border-0">
                                <span className="text-xs font-medium text-gray-500 mr-2">[{result.time}]</span>
                                <span className="text-gray-900 font-medium" dangerouslySetInnerHTML={{ __html: result.content }} />
                              </div>
                            ))}
                          </div>
                        ) : chatResponse ? (
                          <div className="max-h-[300px] overflow-y-auto">
                            <div className="text-gray-900 font-medium" dangerouslySetInnerHTML={{ __html: chatResponse }} />
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm italic">Postavite pitanje o transkriptu da dobijete rezultate...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 text-center py-4">
                <p className="text-gray-600 mb-4">Ovaj snimak još uvek nije transkribovan.</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Transkribuj sada
                </button>
              </div>
            )}
            
            <div className="flex justify-center space-x-2 mt-6" data-component-name="Home">
              <button className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Audio
              </button>
              
              {selectedSnimak.status === 'Obradjeno' && (
                <>
                  <button className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-red-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    PDF
                  </button>
                  
                  <button className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-blue-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Word
                  </button>
                  
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // Čuvamo podatke u localStorage
                      localStorage.setItem('transkrajber_snimak', JSON.stringify({
                        naziv: selectedSnimak.naziv,
                        datum: selectedSnimak.datum,
                        duzina: selectedSnimak.duzina,
                        transkript: transkript
                      }));
                      // Otvaramo novu stranicu bez parametara u URL-u
                      window.open('/prosireni-prikaz', '_blank');
                    }}
                    className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-blue-600 flex items-center"
                    data-component-name="Home"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Proširen prikaz
                  </a>
                </>
              )}
              
              <button className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Obriši
              </button>
              
              <button 
                onClick={() => setShowSnimakDetails(false)}
                className="px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-blue-500 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
