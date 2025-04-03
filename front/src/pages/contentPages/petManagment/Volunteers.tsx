import { useCreateSpeciesMutation, useGetSpeciesQuery } from "../../../modules/petManagement/api";

export function Volunteers() { 
  //  const dispatch = useAppDispatch();
  
   //  const speciesState = useAppSelector((state) => state.species.speciesState);
  //  const species = useAppSelector((state) => state.species.species);

  //  useEffect(()=>{
  //     if(speciesState === "idle"){
  //       dispatch(getSpecies());
  //     }
  //  }, [dispatch, speciesState]);

  const { 
    data: species = [],
    isError, 
    isLoading
  } = useGetSpeciesQuery({pageNum: 1, pageSize: 10});
   
  const [createSpecies] = useCreateSpeciesMutation();

   if(isError)
      return <div>Произошла ошибка</div>
    
    if(isLoading)
      return <div>Загрузка...</div>
  
  return (    
        <div className="flex flex-col flex-1 min-w-8 mx-auto pt-12 items-center justify-center gap-9">
          <h1>Species:</h1> 
              {species.map((sp)=>(
                <div>
                    <p>id: {sp.id}</p>
                    <p>name: {sp.name}</p>
                </div>
              ))} 

          <div>
            <button onClick={()=>{  
              createSpecies({speciesName: "FromFront"});
            }}>Добавить вид</button>
          </div>
      </div>
  );
} 