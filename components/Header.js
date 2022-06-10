import Image from "next/image"
import {GlobeAltIcon, MenuIcon, SearchIcon, UserIcon, UsersIcon} from "@heroicons/react/solid"
import { useState } from "react"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";


function Header({placeHolder }) {
  const [searchInput, setSearchTnput] = useState('')
  const [numberGuest, setNumberGuest] = useState(1)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const router = useRouter()
  const handleSelect = (ranges)=>{
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }
  const resetInput = ()=>{
    setSearchTnput("")
  }
  const Search = ()=>{
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        nbGuests: numberGuest
      }
    })
    resetInput()
  }

  const selectionRange ={
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }


  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/*left */}
            <div 
            onClick={() => router.push('/')}
            className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image 
                src="https://links.papareact.com/qd3"
                layout="fill"
                objectFit="contain"
                objectPosition="left" 
                />
            </div>
            {/*center - SearchBar */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                value={searchInput}
                onChange={(e)=> setSearchTnput(e.target.value)}
                className=" flex-grow pl-5 bg-transparent outline-none text-sm text-gray-400"
                type="text"
                placeholder={placeHolder || "Start your search" }
                />
                <SearchIcon 
                className="hidden md:inline-flex h-8 cursor-pointer bg-red-400 text-white rounded-full p-2 md:mx-2"
                onClick={Search}
                />
            </div>
            {/*right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6"/>
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserIcon className="h-6" />
                                   </div>
            </div>
            {searchInput && (
            <div className="flex flex-col col-span-3 mx-auto">
            <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5861"]}
            onChange={handleSelect}
            />
            <div className="flex items-center border-b mb-4">
              <h2 className="text-2xl flex-grow font-semibold">Number of guests</h2>
              <UsersIcon className="h-5"/>
              <input 
              type="number" 
              className="w-12 pl-2 text-lg outline-none text-red-400" 
              value={numberGuest}
              min={1}
              onChange={e => setNumberGuest(e.target.value)}
              />
            </div>
            <div className="flex ">
              <button 
              className="flex-grow text-gray-500"
              onClick={resetInput}
              >Cancel</button>
              <button 
              className="flex-grow text-red-400"
              onClick={Search}
              >Search</button>
            </div>
            </div>
              
            )}

    </header>


  )
}

export default Header