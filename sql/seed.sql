INSERT INTO
    venues (
        name,
        street,
        city,
        country,
        capacity,
        technical_rider,
        phone,
        email,
        logo_url,
        conditions_pdf_url,
        latitude,
        longitude
    )
VALUES
    (
        'Sala Terra',
        'Carrer de Ramon Llull, 19',
        'Castelló de la Plana',
        'ES',
        300,
        CAST(
            '{"escenario": 
            {"dimensiones": "6m x 3.10m", 
            "tomas_luz": "6 delante, 10 detrás", 
            "entradas_xlr": "8 delante, 16 detrás"}, 

            "backline": 
            {"baterias": [
            {"marca": "Yamaha", "modelo": "RDP2F5CY-BLG", "componentes": ["Bombo 22\" x 16\" (perforado)", "Caja 14\" x 5.5\"", "Tom 10\" x 07\"", "Tom 12\" x 08\"", "Tom de suelo 16\" x 15\"", "Platillo Hi-Hat 14\"", "Platillo Crash 16\"", "Platillo Ride 20\"", "Pedal FP7210A", "Soporte caja SS650WA", "Soporte Hi-Hat HS650WA", "2x Soportes con brazo platillos CS665A", "1x Sillín"]}, 
            {"marca": "Mapex", "modelo": "Serie M", "componentes": ["Bombo 22\"", "1x Pedal bombo", "Caja 14\"", "1x Soporte de caja", "Tom 16\"", "Timbal 13\"", "Timbal 12\"", "Ride 20\" Paiste Bronze", "3x Soporte de platos", "Hi Hat 14\" Paiste 2002", "1x Soporte de Hi Hat", "1x Sillín"]}], 
            
            "teclados": ["1x Piano de cola Samick"]}, 
            
            "sonido": {"mesa": "Midas M 32 R Live", 
            
            "pa": ["2x Yamaha DBR 15\" (unidades voladas delanteras)", "2x Yamaha DBR 12\" (unidades voladas traseras)"], 
            
            "subwoofer": ["LOUD4 SUB-115 Power: 700W AES"], 
            
            "monitores": ["2x dB Technologies Flexsys FM10", "4x DAS M.I. 12 (RMS) 300W"], 
            
            "etapa": ["1x Akiyama PRO LAX200"]}, 
            
            "microfonia": {"microfonos": ["4x Shure SM58", "3x Behringer XM8500", "4x Behringer XM1800S", "1x AKG Perception 120 (condensador)", "1x AKG Drum Set Session I", "2x Sennheiser E609 Silver (para amplificadores)"], 
            
            "cajas_di": ["2x Caja DI activa de 2 canales (Behringer DI20)"],
            
            "accesorios": ["10x Pies de micro de jirafa", "10x Cables XLR"]}, 
            
            "iluminacion": {"global_truss_4m": ["4x PAR LED (Stairville Outdoor Stage Par 12x3W TRI)", "3x Cabeza móvil (Fun Generation PicoSpot 20 LED)", "1x Estrobo (Stairville LF-12 LED Flash COB Strobe DMX 12)"],
            
            "frontal_volado": ["2x Barra LED (ADJ UB 12H)"], "maquina_humo": "1x Stairville AFH-600 DMX Hazer", 
            
            "control": "1x Daslight Light Rider Wifi DMX interface"}}' AS jsonb
        ),
        '607 498 096',
        ' info@terraconcerts.com',
        NULL,
        NULL,
        39.981007745644575,
        -0.04053484566252494
    );

INSERT INTO
    venues (
        name,
        street,
        city,
        country,
        capacity,
        technical_rider,
        phone,
        email,
        logo_url,
        conditions_pdf_url,
        latitude,
        longitude
    )
VALUES
    (
        'Razzmatazz',
        'Carrer Almogàvers, 122',
        'Barcelona',
        'ES',
        2100,
        CAST(
            '{"equipo_sonido": 
            
            {"sistema_pa": 
            {"altavoces_pa": "10x L\"ACOUSTICS K2 (Sistema audio Frontal)", 
            "subgraves": "6x L\"ACOUSTICS KS28", "satelites_anfiteatros": "8x L\"ACOUSTICS ARCS II", 
            "altavoces_front": "8x L\"ACOUSTICS A15 FOCUS (altavoz pasivo)", 
            "altavoces_discoteca": "4x L\"ACOUSTICS A15 (Sistema audio Trasero - Únicamente para Sesiones de Discoteca)", 
            "amplificadores": ["8x L\"ACOUSTICS LA12X", "2x L\"ACOUSTICS LA8", "2x L\"ACOUSTICS LA4X"], 
            "procesadores": ["2x LAKE CONTOUR LMX88 (Ubicado en el control de sonido de PA)", "1x LAKE CONTOUR LM44 (Ubicados a la derecha del escenario)", "LAKE Sistema (hasta 16 módulos de procesado)"]}, 
            
            "control_sonido_pa": 
            {"mesa_sonido": "1x DIGICO QUANTUM 326 / VENUE S6L 32D Superficie de Control", 
            "preamp": "1x VENUE STAGE 64 (56 Entradas Analógicas + 24 Salidas Analógicas + 8 Salidas AES) / SD RACK MADI", 
            "engine": "1x VENUE E6L 144 Engine", 
            "plugins": ["1x DMI WAVES CARD / WSG-HD Waves SoundGrid", "1x MAC MINI M4", "1x SOUNDGRID EXTREME SERVER / SOUNDGRID EXTREME-C SERVER", "1x FOURIER AUDIO TRANSFORM ENGINE", "1x TRANSFORM SUITE \"26 Con Licencia", "1x SET PLUGINS WAVES V16 Con Licencia", "1x DMI DANTE64@96"], 
            
            "otros": 
            ["1x CD TASCAM CD-200SB (CD + USB)", "1x SAI SALICRU 2000Va - 1800W (Control de sonido de PA)", "2x BEHRINGER EUROLIVE B205·D Altavoz Sistema de Shout", "1x LIMITACIÓN AUDIO a 105dbA (control de PA)", "1x SAI SALICRU 2000Va - 1800W (S6L + E6L)"]}, 
            "sistema_intercom": ["2x HOLLYVOX Sistema de Intercom Inalámbrico", "1x INTERCOM Avisador Lumínico"], 
            
            "monitores": 
            {"side_fill_y_amplis": ["4x TURBOSOUND QLIGHT TQ310", "2x L\"ACOUSTICS KS21", "2x L\"ACOUSTICS LA4X"], 
            
            "drumfills": 
            ["2x L\"ACOUSTICS KS21", "2x L\"ACOUSTICS X12"], 
            
            "monitores_y_amplis": 
            ["12x L\"ACOUSTICS X12 (monitor pasivo)", "1x L\"ACOUSTICS LA12X AMP", "2x L\"ACOUSTICS LA4X"]},
             
            "control_monitores": 
            {"mesa_sonido": ["1x DIGICO QUANTUM 326", "1x VENUE S6L 32D Superficie de Control"], 
            "previos": "1x SD RACK MADI (56 Entradas Analógicas + 24 Salidas Analógicas + 8 Salidas AES)", 
            "extras": ["1x SAI SALICRU 750Va - 450W (Previos a Escenario)", "1x BEHRINGER EUROLIVE B205·D Altavoz Sistema de Shout"], 
            "plugins": "1x SET PLUGINS WAVES V16 Con Licencia", "otros": ["1x Micrófono con interruptor", "2x Micrófono con interruptor", "1x 56Ch SPLITTER PASIVO Ubicado Escenario Derecha"]}, 
            
            "microfonia": ["7x SHURE SM57", "7x SHURE SM58", "4x SENNHEISER 604", "4x SHURE BETA57", "4x SHURE ULXD4D CÁPSULA SM58 (MICRÓFONO INALÁMBRICO)", "2x SHURE BETA52", "2x SHURE SM91", "2x AKG 414", "2x AKG CK391", "2x SHURE 81", "2x SENNHEISER MD421", "16x DI BSS AR-133", "4x SENNHEISER e906", "4x AUDIX OM7", "2x AUDIOTECHNICS AT PRO35"], 
            
            "cableado_y_varios": ["1x MANGUERA x4 CAT6 FTP Exclusiva mesa de sonido AVID S6L (x2 Sistema S6L + x2 Reserva)", "4x LÍNIAS CAT6 S/FTP 3 tramos (FOH < > MON SL) Uso exclusivo Producciones externas", "8x XLR LÍNIAS ANALÓGICAS ENTRADAS/SALIDAS (FOH < > MON SL)", "4x AES LÍNIAS - FOH a LAKE LM44 Escenario Derecha", "3/4 TÉCNICOS DE SONIDO (Según Producción de sonido)"]}}' AS jsonb
        ),
        '933 208 200',
        'inforazz@salarazzmatazz.com',
        NULL,
        NULL,
        41.39785803421167,
        2.1909811988460457
    );