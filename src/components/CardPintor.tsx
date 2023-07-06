import { Link } from 'react-router-dom';

interface CardPintorProps {
  id: string;
  photo: string;
  name: string;
  city: string;
}

export function CardPintor(props: CardPintorProps) {
  return (
    <div className="overflow-hidden w-full sm:w-[300px] rounded-2xl bg-gray-50">
      <div className="flex items-center h-[220px] overflow-hidden">
        <img src={props.photo} alt="Pintor" className="w-full" />
      </div>

      <div className="p-6">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div>
            <h2 className="mt-2 text-lg font-semibold text-gray-800">{props.name}</h2>
            <p className="text-gray-400">{props.city}</p>
          </div>
        </div>

        <hr className="mt-4 mb-4" />

        <div className="flex flex-wrap justify-between">
          <p className="inline-flex items-center">
            <Link
              to={`/perfil/${props.id}/`}
              className="mt-2 inline-block rounded-md bg-orange-400 p-3 text-center font-medium text-white"
            >
              Saiba Mais
            </Link>
          </p>

          <p className="inline-flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <span className="ml-2">5.0</span>
          </p>
        </div>
      </div>
    </div>
  );
}