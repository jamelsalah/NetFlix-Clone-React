import React, {useEffect, useState} from 'react';
import './App.css';
import api from './api';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';


export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      let list = await api.getHomeList();
      setMovieList(list);

      let originals  = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await api.getMovieInfo(chosen.id, 'tv');

      setFeatureData(chosenInfo);
      console.log(randomChosen)
    }

    loadAll()
  }, [])

  return (
    <div className="page">

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  )
}