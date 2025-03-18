'use client';

import Link from 'next/link';

export default function Uputstvo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Korisničko uputstvo</h1>
          <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Nazad na početnu
          </Link>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-8">
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Početak rada</h2>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li>Snimite audio pomoću mikrofona ili otpremite postojeće WAV fajlove</li>
              <li>Sačuvajte snimke sa opisnim imenima</li>
              <li>Izaberite snimak za transkribovanje</li>
              <li>Pregledajte i analizirajte transkript</li>
            </ol>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Funkcije</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="mr-3 text-xl">🎤</span> 
                <div>
                  <p className="font-medium">Snimanje zvuka u pregledaču</p>
                  <p className="text-sm text-gray-600">Snimajte audio direktno kroz web aplikaciju bez potrebe za dodatnim softverom.</p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-xl">📁</span> 
                <div>
                  <p className="font-medium">Upravljanje audio fajlovima</p>
                  <p className="text-sm text-gray-600">Jednostavno puštanje, preuzimanje i brisanje snimaka.</p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-xl">🔊</span> 
                <div>
                  <p className="font-medium">Automatska detekcija govornika</p>
                  <p className="text-sm text-gray-600">Sistem automatski prepoznaje različite govornike u razgovoru.</p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-xl">📊</span> 
                <div>
                  <p className="font-medium">Alati za analizu razgovora</p>
                  <p className="text-sm text-gray-600">Analizirajte ključne tačke, sentiment i druge aspekte razgovora.</p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-xl">📝</span> 
                <div>
                  <p className="font-medium">AI sažimanje</p>
                  <p className="text-sm text-gray-600">Automatsko kreiranje sažetaka dugih razgovora.</p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-xl">❓</span> 
                <div>
                  <p className="font-medium">Pitanja i odgovori</p>
                  <p className="text-sm text-gray-600">Postavljajte pitanja o sadržaju razgovora i dobijte relevantne odgovore.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Zahtevi</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-blue-500">•</span>
                <p>Uverite se da je backend API pokrenut (http://localhost:3051)</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-500">•</span>
                <p>Koristite Chrome/Firefox za najbolje iskustvo snimanja</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-500">•</span>
                <p>Audio fajlovi moraju biti u WAV formatu</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
