import React from 'react';

const AcercaDe = () => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#fcf3f3',
            fontFamily: '"Lato", sans-serif',
            color: '#002147',
            paddingBottom: '4rem',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Background Decorators */}
            <div style={{ position: 'absolute', top: -50, left: -50, width: 300, height: 300, backgroundColor: '#D8B4E2', borderRadius: '50%', opacity: 0.3, filter: 'blur(50px)' }}></div>
            <div style={{ position: 'absolute', top: '40%', right: -100, width: 400, height: 400, backgroundColor: '#FFB6C1', borderRadius: '50%', opacity: 0.3, filter: 'blur(70px)' }}></div>
            <div style={{ position: 'absolute', bottom: -50, left: '20%', width: 250, height: 250, backgroundColor: '#40E0D0', borderRadius: '50%', opacity: 0.2, filter: 'blur(60px)' }}></div>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 10 }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '3.5rem', margin: 0, color: '#002147', lineHeight: 1.2 }}>
                        Acerca de Fundación NIDE A.C.
                    </h1>
                    <h2 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '2rem', color: '#14B8A6', margin: '0.5rem 0 2rem 0', fontWeight: 500 }}>
                        Sembremos juntos el futuro
                    </h2>

                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <p style={{ fontSize: '1.15rem', lineHeight: 1.8, marginBottom: 0 }}>
                            En <strong>Fundación NIDE</strong>, creemos que cada niño y joven en México posee un universo de posibilidades. Desde nuestra fundación en 1952 (originalmente como el Instituto de Protección para el Niño Desvalido Miguel Alemán), hemos dedicado nuestra labor a ser un pilar de apoyo para quienes más lo necesitan. Hoy, evolucionamos para convertirnos en un catalizador de sueños.
                        </p>
                    </div>
                </div>

                {/* Section: Nuestra Nueva Identidad */}
                <div style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '2.5rem', color: '#002147', borderBottom: '3px solid #D8B4E2', paddingBottom: '0.5rem', display: 'inline-block' }}>
                        Nuestra Nueva Identidad: Soñar por un mejor futuro
                    </h3>
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.8, marginTop: '1.5rem' }}>
                        Nuestra imagen renovada nace de una convicción simple pero poderosa: para construir un mañana mejor, primero debemos permitirnos soñar con él.
                    </p>
                </div>

                {/* Section: ¿Qué nos inspira? */}
                <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', marginBottom: '4rem', borderLeft: '8px solid #FFB6C1' }}>
                    <h3 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '2.2rem', color: '#002147', marginTop: 0 }}>
                        ¿Qué nos inspira?
                    </h3>
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.8, marginBottom: 0 }}>
                        Nuestra esencia se resume en la imagen de la Jacaranda de los Sueños. Al igual que este árbol emblemático, la educación y el apoyo que brindamos permiten que los sueños florezcan. Las nubes en nuestras copas representan las oportunidades cambiantes y brillantes que buscamos poner al alcance de cada niño.
                    </p>
                </div>

                {/* Section: ¿Qué hacemos? */}
                <div style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '2.5rem', color: '#002147', textAlign: 'center', marginBottom: '2rem' }}>
                        ¿Qué hacemos?
                    </h3>
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.8, textAlign: 'center', marginBottom: '2.5rem' }}>
                        Trabajamos incansablemente por impulsar las capacidades, condiciones y derechos de la infancia y juventud mexicana. Nuestra labor se centra en:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '15px', borderTop: '5px solid #14B8A6', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <h4 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.6rem', color: '#002147', marginTop: 0 }}>Desarrollo Integral</h4>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 0 }}>Brindamos herramientas que fortalecen el crecimiento académico y personal.</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '15px', borderTop: '5px solid #FFB6C1', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <h4 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.6rem', color: '#002147', marginTop: 0 }}>Protección de Derechos</h4>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 0 }}>Aseguramos un entorno donde los niños puedan sentirse seguros para imaginar y crear.</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '15px', borderTop: '5px solid #D8B4E2', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <h4 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.6rem', color: '#002147', marginTop: 0 }}>Inspiración</h4>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 0 }}>Como la estrella que cae de nuestro árbol, buscamos ser ese destello que motiva a los jóvenes a mirar alto al firmamento y alcanzar sus metas.</p>
                        </div>
                    </div>
                </div>

                {/* Section: Nuestros Valores en Colores */}
                <div>
                    <h3 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '2.5rem', color: '#002147', textAlign: 'center', marginBottom: '2.5rem' }}>
                        Nuestros Valores en Colores
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#14B8A6', marginRight: '1.5rem', flexShrink: 0 }}></div>
                            <div>
                                <h4 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.4rem', color: '#002147', margin: '0 0 0.25rem 0' }}>Confianza</h4>
                                <p style={{ fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>Construimos espacios seguros y transparentes.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFB6C1', marginRight: '1.5rem', flexShrink: 0 }}></div>
                            <div>
                                <h4 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.4rem', color: '#002147', margin: '0 0 0.25rem 0' }}>Sensibilidad</h4>
                                <p style={{ fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>Actuamos con amor y empatía en cada proyecto.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D8B4E2', marginRight: '1.5rem', flexShrink: 0 }}></div>
                            <div>
                                <h4 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.4rem', color: '#002147', margin: '0 0 0.25rem 0' }}>Identidad</h4>
                                <p style={{ fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>Honramos nuestras raíces mexicanas, representadas por el color de las jacarandas.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#002147', marginRight: '1.5rem', flexShrink: 0 }}></div>
                            <div>
                                <h4 style={{ fontFamily: '"Baloo 2", cursive', fontSize: '1.4rem', color: '#002147', margin: '0 0 0.25rem 0' }}>Seriedad</h4>
                                <p style={{ fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>Mantenemos el compromiso profesional que nos ha respaldado por más de siete décadas.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AcercaDe;
