/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

interface GameData {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  status: number;
}

interface SearchBarProps {
  setGames: React.Dispatch<React.SetStateAction<GameData[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = (props: SearchBarProps) => {
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  async function getData() {
    const queryPlatform = platform ? `platform=${platform}` : "";
    const queryGenre = genre ? `category=${genre}` : "";
    const querySort = sort ? `sort=${sort}` : "";
    const querySearch = search ? `search=${search}` : "";

    props.setLoading(true);
    const newGames = await fetch(
      `https://data-gado.herokuapp.com/gamegratis?${queryPlatform}&${queryGenre}&${querySort}&${querySearch}`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    props.setGames(newGames);
    props.setLoading(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getData();
  }

  useEffect(() => {
    if (platform || genre || sort) getData();
  }, [platform, genre, sort]);

  return (
    <div id="search" className="font-roboto text-slate-800 text-sm">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-wrap flex-col items-center md:flex-row gap-5 justify-between"
      >
        <label htmlFor="platform">
          <span className="font-bold">Platform: </span>
          <select
            name="platform"
            id="platform"
            onChange={(e) => {
              setPlatform(e.target.value);
            }}
          >
            <option value="">All Platforms</option>
            <option value="pc">Windows(PC)</option>
            <option value="browser">Browser(WEB)</option>
          </select>
        </label>
        <label htmlFor="genre">
          <span className="font-bold">Genre: </span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value="">All Genres</option>
            <option value="mmorpg">MMORPG</option>
            <option value="shooter">Shooter</option>
            <option value="strategy">Strategy</option>
            <option value="moba">Moba</option>
            <option value="card">Card Games</option>
            <option value="racing">Racing</option>
            <option value="sports">Sport</option>
            <option value="social">Social</option>
            <option value="fighting">Fighting</option>
          </select>
        </label>
        <label htmlFor="sort">
          <span className="font-bold">Sort By: </span>
          <select
            name="sort"
            id="sort"
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="">Release Date</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label htmlFor="search">
          <span className="font-bold">Search: </span>
          <input
            type="text"
            className="text-xs text-slate-500 border px-2 py-[5px] rounded-2xl placeholder:italic placeholder:text-slate-300"
            placeholder="Game Title..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

export default SearchBar;
