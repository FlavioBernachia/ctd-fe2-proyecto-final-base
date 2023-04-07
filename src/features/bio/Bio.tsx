import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import * as Styled from "./styled";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <Styled.BioButton
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        isActive={
          bioActiva.id === nombre
            ? true
            : false
        }
      >
        {nombre}
      </Styled.BioButton>
    ));
  };

  return (
    <Styled.BioContainer>
      <Styled.ButtonsContainer>{crearBotones()}</Styled.ButtonsContainer>
      <div>
        <div>
        <Styled.BioImage src={bioActiva.image} alt={bioActiva.nombre} />
        </div>
        <div>
          <h3 className={Styled.BioTitle}>{bioActiva.nombre}</h3>
          <p className={Styled.BioDescription}>{bioActiva.descripcion}</p>
        </div>
      </div>
    </Styled.BioContainer>
  );
};

export default Bio;
