import { useState } from 'react';
import styles from '../Menu/Menu.module.css'

const data = [
  {
    id: 1,
    name: 'Raviolones romanos',
    category: 'principal',
    descripcion: 'De ricota y nueces, con filetes de pollo, jamón cocido, vino blanco, crema, champignones y parmesano.'
  },
  {
    id: 2,
    name: 'Sorrentinos Formaggi',
    category: 'principal',
    descripcion: 'De calabaza y queso, saborizados con filetes de pollo, crema, queso azul, arvejas y panceta crocante.'
  },
  {
    id: 3,
    name: 'Sorrentinos Gratinati',
    category: 'principal',
    descripcion: 'Rellenos de jamón y queso, con salsa de tomate, crema y muzzarella gratinada.'
  },
  {
    id: 4,
    name: 'Tallarines con pesto y hongos',
    category: 'principal',
    descripcion: 'Saborizados con pesto, champignones, crema y brochette de pollo.'
  },
  {
    id: 5,
    name: 'Pizza Margherita',
    category: 'principal',
    descripcion: 'Salsa de tomate y muzzarella.'
  },
  {
    id: 6,
    name: 'Pizza Fugazzeta',
    category: 'principal',
    descripcion: 'Muzzarella y cebolla.'
  },
  {
    id: 7,
    name: 'Pizza Napoletana',
    category: 'principal',
    descripcion: 'Muzzarella, tomates frescos y ajo.'
  },
  {
    id: 8,
    name: 'Pizza de Rúcula',
    category: 'principal',
    descripcion: 'Muzzarella, tomates confitados y rúcula.'
  },
  {
    id: 9,
    name: 'Vegetariana ',
    category: 'salad',
    descripcion: 'Con hojas verdes, dados de calabaza asada, tomates cherry, quinoa, queso en hebras y almendras con aderezo cítrico.'
  },
  {
    id: 10,
    name: 'Verde con champignones',
    category: 'salad',
    descripcion: 'Espinaca, rúcula, champiñones, queso, pollo, palta y aderezo saborizado.'
  },
  {
    id: 11,
    name: 'De Quinoa',
    category: 'salad',
    descripcion: 'Con palta, atún, choclo, tomate cherry y mix de semillas.'
  },
  {
    id: 12,
    name: 'Cesar con langostinos',
    category: 'salad',
    descripcion: 'Hojas verdes, croutones y queso parmesano con aderezo saborizado.'
  },
  {
    id: 13,
    name: 'Carré de cerdo grillado',
    category: 'principal',
    descripcion: 'Con papas españolas, zanahoria glaseada en azúcar morena y aderezo del chef.'
  },
  {
    id: 14,
    name: 'Lomo de cerdo primavera',
    category: 'principal',
    descripcion: 'Cocinado a la grilla recubierto con palta, cebollitas, morrones y jugo de cítricos, con papas rusticas.'
  },
  {
    id: 15,
    name: 'Lomitos rellenos',
    category: 'principal',
    descripcion: 'Con jamón cocido, queso y morrones, sobre salteado de papas, cebollita, rúcula y aderezo de aceto y azúcar negra.'
  },
  {
    id: 16,
    name: 'Filet blanco y negro',
    category: 'principal',
    descripcion: 'Riquísimo, sobre papa al horno, hongos de pino, vino malbec, fondo de carne y crema.'
  },
  {
    id: 17,
    name: 'Empanadas',
    category: 'entrada',
    descripcion: 'Carne suave, carne picante, pollo, jamon y queso, capresse.'
  },
  {
    id: 18,
    name: 'Rabas',
    category: 'entrada',
    descripcion: 'Anillos de calamar rebozados.'
  },
  {
    id: 19,
    name: 'Mini Calzones',
    category: 'entrada',
    descripcion: 'Jamon y Muzarella, Calabresa y Muzarrela, Espinaca y Muzarella.'
  },
  {
    id: 20,
    name: 'Langostinos',
    category: 'entrada',
    descripcion: 'A la plancha con papas y aderezo.'
  },
  {
    id: 21,
    name: 'Tiramisú',
    category: 'postre',
    descripcion: 'Clásico italiano.'
  },
  {
    id: 22,
    name: 'Suspiro Limeño',
    category: 'postre',
    descripcion: 'Crema de leche condensada, canela, oporto y merengue.'
  },
  {
    id: 23,
    name: 'Flan casero',
    category: 'postre',
    descripcion: 'Con dulce de leche.'
  },
  {
    id: 24,
    name: 'Mix de Frutas',
    category: 'postre',
    descripcion: 'Manzana, banana, naranja, kiwi, frutilla, etc.'
  },
];

const Food = () => {
  const [comidas, setComidas] = useState(data);

  // Filtrar por tipo
  const filterType = (category) => {
    setComidas(
      data.filter((item) => {
        return item.category === category;
      })
    );
  };

  return (
    <div className={`${styles.sectionTitle} px-4`}>
      <p className={`${styles.sectionTexto}`}>Famosos por la buena comida</p>
      <h4>menu</h4>

      <div>
          <div>
            <button
              onClick={() => filterType('entrada')}
              className={`${styles.boton} m-1 border px-4 py-2`}
            >
              Entradas
            </button>
            <button
              onClick={() => filterType('principal')}
              className={`${styles.boton} m-1 border px-4 py-2`}
            >
              Almuerzo & Cena
            </button>
            <button
              onClick={() => filterType('salad')}
              className={`${styles.boton} m-1 border px-4 py-2`}
            >
              Ensaladas
            </button>
            <button
              onClick={() => filterType('postre')}
              className={`${styles.boton} m-1 border px-4 py-2`}
            >
              Postre
            </button>
          </div>
      </div>

      {/* Mostrar alimentos */}
      <div className='row'>
        {comidas.map((item, index) => (
          <div
            key={index}
            className='col-12 col-md-6 col-lg-2 col-xl-3 gap-6 pt-3'
          > {/* Utiliza las clases de estilo para cada elemento del alimento */}
            <div className={`${styles.menu_content} card px-2 py-2`}>
              <h3>{item.name}</h3>
              <p>{item.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;