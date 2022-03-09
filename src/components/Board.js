import Tile from "./Tile"

export default function Board() {
  return (
    <div className="container board ratio ratio-1x1 g-0">
      <div className='grid row row-cols-3 g-0'>
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
    </div>
  )
}