"use client";

import { useState } from "react";
import Image from "next/image";
import { FaMicrophone, FaFolder, FaSearch, FaQuestion } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("record");
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null);
  const [transcriptionData, setTranscriptionData] = useState<any | null>(null);
  const [selectedSnimak, setSelectedSnimak] = useState<any | null>(null);
  const [showSnimakDetails, setShowSnimakDetails] = useState<boolean>(false);

  // Dodajemo mock podatke za prikaz
  const mockSnimci = [
    {
      id: 1,
      naziv: 'Sastanak sa klijentom',
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
  const [snimci, setSnimci] = useState(mockSnimci);

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
                  onClick={() => setActiveTab("record")} 
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
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
              <div>
                <div className="text-center py-8">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto transition-colors duration-200">
                    <FaMicrophone size={32} />
                  </button>
                  <p className="mt-4 text-gray-600">Kliknite da započnete snimanje</p>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600" 
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
                    Nema dostupnog transkripta. Izaberite snimak i kliknite na "Transkribuj" da generišete transkript.
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
                    Generiši Sažetak
                  </button>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 italic">Sažetak će biti prikazan ovde nakon generisanja...</p>
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
                      Dobij Odgovor
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transkript</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                  <p className="text-gray-700">
                    Ovo je primer transkripta za snimak. Ovde bi se prikazao stvarni transkript nakon obrade audio snimka. 
                    Možemo dodati i vremenske oznake, označiti govornike, i druge funkcionalnosti za poboljšanje čitljivosti transkripta.
                  </p>
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
            
            <div className="flex justify-center space-x-2 mt-6">
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
