"use client"
import { Game, GameConfig, gameBankWithRTP } from "@/config/gameBank";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import {useState} from 'react';
import Link from "next/link";
import Carousel from "@/components/carousel";

export default function Home() {
  const [selectedGame,setSelectedGame] = useState("PRAGMATIC PLAY")
  const gameBankRTP:GameConfig = JSON.parse(JSON.stringify(gameBankWithRTP()))
  const [showGameRTP,setShowGameRTP] = useState<Game[]>(gameBankRTP[selectedGame].data)
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === ""){
      setShowGameRTP(gameBankRTP[selectedGame].data)
    }else {
      setShowGameRTP(gameBankRTP[selectedGame].data.filter((item)=> item.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }
  }
  const handleSelect = (e:string) => {
    setSelectedGame(e)
    setShowGameRTP(gameBankRTP[e].data)
  }
  return (
    <main className="lg:max-w-7xl mx-auto xl:pt-1">
      <header className="h-20 flex justify-between items-center px-2 md:px-3 bg-slate-900 xl:rounded-md">
        <div className="w-44 md:w-64">
          <Image src="/assets/logo.webp" alt="kampung69 logo" width={800} height={200}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="btn from-green-800 to-green-500 text-white">Daftar</button>
          <button className="hidden md:block btn from-orange-700 to-orange-500 text-white">Login</button>
        </div>
      </header>
      <section className="w-full bg-slate-800 mt-2">
        <Image src="/assets/banner.jpg" alt="banner RTP" width={1280} height={384} />
      </section>
      <section className="w-full my-2 rounded px-3 py-1 bg-gray-900 text-white flex items-center space-x-3">
        <div><Image src = "/assets/icon/volume.svg" alt="My Happy SVG" width={24} height={24}/></div>
        <Marquee speed={100} className="text-sm">
          <p className="pl-[60rem]">
            SELAMAT DATANG DI RTP SLOT GACOR TERBARU. RTP SLOT GACOR TERBARU INI HANYA BERLAKU DI SITUS KAMI DAN SEKEDAR REKOMENDASI KAMI! POLA YANG DIBERIKAN SESUAI DENGAN PENGALAMAN BERMAIN KAMI! BUKAN ASAL-ASALAN MEMBERIKAN POLA, SUDAH TERBUKTI DAN LULUS UJI COBA !!
          </p>
        </Marquee>
      </section>
      <section className="flex flex-col lg:flex-row gap-2 overflow-hidden">
        <nav className="w-52 hidden lg:block">
          <ul className="menu bg-gray-800 text-white">
            {Object.keys(gameBankRTP).map((item,index) => {
              return (
                <li key={index} onClick={()=>handleSelect(item)} className={`${item===selectedGame?"active":""} flex items-center space-x-3`}>
                  <div><Image src={gameBankRTP[item].icon} alt={item} width={24} height={24}/></div>
                  <span>{item}</span>
                </li>
              )
            })}
          </ul>
        </nav>
        <nav className="w-screen overflow-hidden block lg:hidden">
          <Carousel>
              {Object.keys(gameBankRTP).map((item,index) => {
                return(
                    <div key={`mb${item}-${index}`} onClick={()=> handleSelect(item)}>
                      <Image src={gameBankRTP[item].icon} alt={item} width={90} height={90}/>
                    </div>
                  )
              })}
            </Carousel>
        </nav>
        <div className="w-full flex flex-col gap-2">
          <div className="flex px-3 py-3 bg-gray-900 items-center justify-between text-white">
            <h3 id="filterTittle" className="font-bold">RTP SLOT : {selectedGame}</h3>
            <input id="inputFilter" className=" bg-gray-700 text-gray-300 px-3 py-1 rounded" placeholder="search..." onChange={(e)=> handleFilter(e)}/>
          </div>
          <div id="rtpList" className="text-sm p-2 lg:p-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {showGameRTP.map((item,index)=> {
              return(
                <Link key={`${item.code}-${index}`} href="/" className="bg-gray-800 mb-3 rounded-lg">
                  <div className="p-2 w-full inline-block group">
                    <div className="overflow-hidden rounded-lg">
                      <div className="w-full h-32 overflow-hidden relative">
                        <div className="group-hover:scale-125 group-hover:rotate-0 transition-all">
                          <div className="absolute inset-0 bg-black bg-opacity-50 hidden group-hover:flex justify-center items-center">
                            <p className="px-3 py-1 text-xs uppercase font-semibold bg-yellow-500 hover:text-white rounded">Main</p>
                          </div>
                          <Image loading="lazy" width={200} height={200} src={item.img} alt={item.name}/>
                        </div>
                      </div>
                      <div className="flex bg-gray-900 relative">
                        <div className="h-6 relative" style={{width: item.rtp?.rtp+"%",background: item.rtp?.color}}>
                          <div className="absolute inset-0 animate-shining bg-white opacity-0 z-10"></div>
                        </div>
                        <p className="absolute bottom-0 inset-x-0 text-center text-white font-bold">{item.rtp?.rtp}%</p>
                      </div>
                    </div>
                    <p className="text-center text-white text-sm py-2">{item.name}</p>
                    <div className="rounded-lg mb-2 py-2 text-center px-3 text-gray-900 font-semibold" style={{background: item.rtp?.color}}>
                      <h5 className="border-white text-sm font-bold">JAM GACOR</h5>
                      <p>{item.rtp?.jam}</p>
                    </div>
                    <div className="rounded-lg py-2 text-center px-3 text-gray-900 font-semibold" style={{background: item.rtp?.color}}>
                      <h5 className="border-b border-white text-sm font-bold py-2">POLA MAIN</h5>
                      <p>{item.rtp?.pola[0]}</p>
                      <p>{item.rtp?.pola[1]}</p>
                      <p>{item.rtp?.pola[2]}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
  </main>
  )
}
