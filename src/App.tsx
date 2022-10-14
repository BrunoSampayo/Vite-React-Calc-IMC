import { useState } from 'react';
import styles from './App.module.css';
import powedImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/GridItem';

import { levels,calculateImc, Level } from './helpers/imc';



const App= () => {
  const [heightFiel, setHeightField] = useState<number>(0);
  const [weightFiel, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level|null>(null)
  
  const handleCalculateButton = ()=>{
    if(heightFiel && weightFiel){
      setToShow(calculateImc(heightFiel,weightFiel));
    }else{
      alert("Preencha todos os campos.")
    }
  }

  const handleBackButton = () =>{
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powedImage} alt="" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Indice de Massa Corpóera, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
          type="number" 
          placeholder='Digite a sua altura. Exemplo 1.5 (em métros).'
          value={heightFiel > 0 ? heightFiel:'' }
          onChange={e=>setHeightField(parseFloat(e.target.value))}
          disabled={!!(toShow)}
          />
           
          <input 
          type="number" 
          placeholder='Digite o seu peso. Exemplo 75 (kg).'
          value={weightFiel > 0 ? weightFiel:'' }
          onChange={e=>setWeightField(parseFloat(e.target.value))}
          disabled={!!(toShow)}
          />

          <button onClick={handleCalculateButton}  disabled={!!(toShow)}>Calcular</button >
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item,key)=>(
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow &&
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton}>
              <img src={leftArrowImage} width={25} alt="" />
            </div>
            <GridItem item={toShow}/>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App
