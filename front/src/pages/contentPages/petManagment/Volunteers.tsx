import { useEffect } from "react";
import { getSpecies } from "../../../modules/petManagement/species.slice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

export function Volunteers() { 
   const dispatch = useAppDispatch();
   const speciesState = useAppSelector((state) => state.species.speciesState);
   const species = useAppSelector((state) => state.species.species);

   useEffect(()=>{
      if(speciesState === "idle"){
        dispatch(getSpecies());
      }
   }, [dispatch, speciesState]);

   if(speciesState === "failed")
      return <div>Произошла ошибка</div>
    
    if(speciesState === "pending")
      return <div>Загрузка...</div>

    
  return (   
        <div className="flex flex-col flex-1 min-w-8 mx-auto pt-12 items-center justify-center gap-9">
          <h1>Species:</h1> 
          {species.map((species)=>(
            <div>
                <p>id: {species.id}</p>
                <p>name: {species.name}</p>
            </div>
          ))}
      </div>
  );
} 