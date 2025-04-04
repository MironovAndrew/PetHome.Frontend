import { useGetPetsQuery } from "../../../modules/petManagementService/petEntity/petsApi";

export function Volunteers() { 
  const { 
    data: pets = [],
    isError, 
    isLoading
  } = useGetPetsQuery({ 
      speciesId: "a418b7e3-c6a9-435c-9537-9f55f646491e", 
      name: undefined,
      age: undefined, 
      breedId: "a418b7e3-c6a9-435c-9537-9f55f646491e", 
      color: "black", 
      shelterId: undefined,
      weight: undefined, 
      isVaccinated: undefined, 
      isCastrated: undefined,
      status: undefined, 
      pagedListDto: {pageSize: 22, pageNum:1}
    });
   
   if(isError)
      return <div>Произошла ошибка</div>
    
    if(isLoading)
      return <div>Загрузка...</div>
  
  return (    
        <div className="flex flex-col flex-1 min-w-8 mx-auto pt-12 items-center justify-center gap-9">
          <h1>Species:</h1> 
              {pets.map((pet)=>(
                <div>
                    <p>id: {pet.id}</p>
                    <p>name: {pet.name}</p> 
                    <p>weight: {pet.weight}</p>
                    <p>status: {pet.status}</p>
                </div>
              ))}  
      </div>
  );
} 