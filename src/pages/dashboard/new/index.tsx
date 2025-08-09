import { Container } from "../../../components/container"
import { DashboardHeader } from "../../../components/panelheader"
import { FiTrash, FiUpload } from "react-icons/fi"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/input"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { type ChangeEvent, useContext, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { v4 as uuidV4 } from 'uuid'
import toast from "react-hot-toast"

import { storage, db } from "../../../services/firebaseConnection"
import { 
  ref, uploadBytes, getDownloadURL, deleteObject 
} from 'firebase/storage'
import { addDoc, collection } from "firebase/firestore"

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model:z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O ano do carro é obrigatório"),
  km: z.string().nonempty("O km do carro é obrigatório"),
  price: z.string().nonempty("O preço é obrigatório"),
  city:z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O Telefone é obrigatório").refine((value ) => /^(\d{10,12})$/.test(value), {
   message: "Numero de telefone invalido." 
  }),
  description: z.string().nonempty("A descrição é obrigatoria")
})

type FormData = z.infer<typeof schema>;

interface ImageItemProps{
    uid: string;
    name: string;
    previewUrl: string;
    url: string;

}



export function New() {


  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);
  const { user } = useContext(AuthContext);
  const {register, handleSubmit, formState:{errors}, reset } = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: "onChange"
})


async function handleDeleteImage(item: ImageItemProps){
    const imagePath = `images/${item.uid}/${item.name}`;
    const imageRef = ref(storage, imagePath)

    try {
      await deleteObject(imageRef)
      setCarImages(carImages.filter((car) => car.url !== item.url))
    }catch(err){
        console.log("erro ao deletar image")
      }
    
}

async function handleFile(e : ChangeEvent<HTMLInputElement>){

  if(e.target.files && e.target.files[0]){
    const image = e.target.files[0]

    if(image.type === 'image/jpeg' || image.type === 'image/png'){

      await handleUpload(image);
      toast.success("Imagem Cadastrada com sucesso!")

  }else{
    toast.error("Envie a imagem em JPG ou PNG.")
      return
  }

  }


}


async function handleUpload(image: File){
      if(!user?.uid){
        return;
      }

      const currentUid = user?.uid;
      const uidImage = uuidV4();

      const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

      uploadBytes(uploadRef, image)
      .then((snapshot)=> {

        getDownloadURL(snapshot.ref).then((downlaodUrl)=>{

          const imageItem = {
            name: uidImage,
            uid: currentUid,
            previewUrl: URL.createObjectURL(image),
            url: downlaodUrl,
          }

          setCarImages((images)=> [...images, imageItem])
        })

      })


}

function onSubmit(data: FormData){
      if(carImages.length === 0){
        toast.error("Envie uma imagem.")
          return; 
      }
        const carListImages = carImages.map (car => {
          return{
            uid : car.uid,
            name: car.name,
            url: car.url
          }
        })

        addDoc(collection(db, "cars"), {
          name: data.name.toUpperCase(),
          model: data.model,
          whatsapp: data.whatsapp,
          city: data.city,
          year: data.year,
          km: data.km,
          price: data.price,
          description: data.description,
          created: new Date(),
          owner: user?.name,
          uid: user?.uid,
          images: carListImages,
        })
        .then(() => {
          reset();
          setCarImages([]);
          console.log("Cadastrado com sucesso")
          toast.success("Carro cadastrado com sucesso")

        })
        .catch((error)=>{
          console.log(error)
          console.log("Cadastrado com sucesso")
          toast.error("Erro ao cadastrar o carro")
          
        })

} 
  return (
   

        <Container>
             <DashboardHeader/>


             <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
              <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                <div className="absolute cursor-poiter">
                <FiUpload size={30} color="#000"/>
                </div>
                <div className="cursor-pointer">
                  <input 
                  type="file" 
                  accept="image/*"  
                  className="opacity-0 cursor-pointer"
                  onChange={handleFile}/>
                </div>
              </button>

              {carImages.map (item => (
                <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
                  <button className="absolute" onClick={() => handleDeleteImage(item)}>
                    <FiTrash size={28} color="#FFF" className="cursor-pointer"/>
                  </button>
                <img src={item.previewUrl} 
                alt="Foto carro"
                className="rounded-lg w-full h-32 object-cover" />

                </div>
              ))}
             </div>

             <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row  items-center gap-2 mt-2">
              
              <form className="w-full"
              onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <p className="mb-2 font-medium">Nome do carro</p>
                  <Input
                  type="text"
                  register={register}
                  name="name"
                  error={errors.name?.message}
                  placeholder="Ex: Onix 1.0"
                  />

                </div>
                                <div className="mb-3">
                  <p className="mb-2 font-medium">Modelo do carro</p>
                  <Input
                  type="text"
                  register={register}
                  name="model"
                  error={errors.model?.message}
                  placeholder="Ex: 1.0 plus manual"
                  />

                </div>
                <div className="flex w-full mb-3 flex-row items-center gap-4">

                   <div className="w-full">
                  <p className="mb-2 font-medium">Ano do carro</p>
                  <Input
                  type="text"
                  register={register}
                  name="year"
                  error={errors.year?.message}
                  placeholder="Ex: 2020/2020"
                  />
                </div>
                  <div className="w-full">
                  <p className="mb-2 font-medium">Km rodados</p>
                  <Input
                  type="text"
                  register={register}
                  name="km"
                  error={errors.km?.message}
                  placeholder="Ex: 190.000"
                  />
                </div>
                </div>
                                <div className="flex w-full mb-3 flex-row items-center gap-4">

                   <div className="w-full">
                  <p className="mb-2 font-medium">Telefone / Whatsapp</p>
                  <Input
                  type="text"
                  register={register}
                  name="whatsapp"
                  error={errors.whatsapp?.message}
                  placeholder="Ex: 014991955877"
                  />
                </div>
                  <div className="w-full">
                  <p className="mb-2 font-medium">Cidade</p>
                  <Input
                  type="text"
                  register={register}
                  name="city"
                  error={errors.city?.message}
                  placeholder="Ex: Marilia-SP"
                  />
                </div>
                </div>
                               <div className="mb-3">
                  <p className="mb-2 font-medium">Preço</p>
                  <Input
                  type="text"
                  register={register}
                  name="price"
                  error={errors.price?.message}
                  placeholder="Ex: 69,000"
                  />

                </div>
                            <div className="mb-3">
                  <p className="mb-2 font-medium">Descrição</p>
                    <textarea className="border-2 w-full rounded-md h-24 px-2"
                    {...register("description")}
                    name="description"
                    id="description"
                    placeholder = "Digite a descrição completa sobre o carro..."/>
                    {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
                </div>

                <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10"> Cadastrar</button>
                </form>
             </div>
           </Container>
     

  )
}


