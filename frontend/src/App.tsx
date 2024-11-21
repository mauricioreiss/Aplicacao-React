import { FormEvent, useRef, useEffect, useState } from "react"
import { FiTrash } from "react-icons/fi"
import { Api } from './services/api'

interface custumerProps {

  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {

  const [custumers, setCustumers] = useState<custumerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    LoadClientes();
  }, [])


  async function LoadClientes() {
    const response = await Api.get("/custumers")
    setCustumers(response.data);
  }

  async function HandleCadastra(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) {
      alert("Campos Obrigatorios");
      return
    }

    const isClientExist = custumers.some(
      (Client) => Client.name === nameRef.current?.value || Client.email === emailRef.current?.value
    );

    if(isClientExist)
    {
      alert("usuario ja cadastrado!");
      return
    }
    
    const response = await Api.post("/Custumer", {

      name: nameRef.current?.value,
      email: emailRef.current?.value

    })

    setCustumers(allcustumer => [...allcustumer, response.data]);

    nameRef.current.value = ""
    emailRef.current.value = ""

  }

  async function HandleDelete(id: string) {

    try {

      await Api.delete("/DeleteCustumers", {
        params: {
          id: id,
        }
      })

      const allCustumers = custumers.filter((Custumer) => Custumer.id !== id)

      setCustumers(allCustumers)

    } catch (error) {
      console.log("Nao Apagou")

    }
  }


  return (
    <div className="w-full min-h-screen bg-gray-700 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl ">
        <h1 className="text-4xl font-medium text-white">clientes</h1>

        <form className="flex flex-col my-6" onSubmit={HandleCadastra}>
          <label className="font-medium text-white">Nome:</label>
          <input
            ref={nameRef}
            type="text"
            className="w-full mb-5 p-2 rounded"
            placeholder="Digite seu nome completo....">
          </input>
          <label className="font-medium text-white">Email:</label>
          <input
            ref={emailRef}
            type="text"
            className="w-full mb-5 p-2 rounded"
            placeholder="Digite email...">
          </input>

          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-red-600 rounded font-medium text-white">
          </input>
        </form>

        <section className="flex flex-col gap-4">
          {custumers.map((custumers) => (
            <article key={custumers.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">

              <p><span className="font-medium">name:</span>{custumers.name}</p>
              <p><span className="font-medium">email:</span>{custumers.email}</p>
              <p><span className="font-medium">status:</span>{custumers.status ? "Inativo" : "Ativo"}</p>

              <button className="bg-red-600 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-0"
                onClick={() => HandleDelete(custumers.id)}>
                <FiTrash size={18} color="fff" />
              </button>

            </article>
          ))}
        </section>

      </main>
    </div>

  )
}