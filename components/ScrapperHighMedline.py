import requests
from bs4 import BeautifulSoup

# FUNCION PARA HACER LA SOLICITUD HTTP

def scrape_list_items_from_third_section(url):
    # SOLICITUD
    response = requests.get(url)
    response.raise_for_status()  # RAISE FOR STATUS COMO EN SPRING

    # ANALISIS CONTENIDO
    soup = BeautifulSoup(response.content, 'html.parser')

    # FILTRAR POR 'SECTION'
    sections = soup.find_all('section')

    # NOS ASEGURAMOS DE QUE NO HAYA CAMBIADO LA CANTIDAD DE SECTIONS
    if len(sections) < 3:
        raise ValueError("El documento HTML no contiene al menos tres secciones")

    # LA TERCERA EN MEDLINE SON ALIMENTOS ALTOS
    third_section_high = sections[3]

    # FIND ALL LI DE LA TERCERA SECTION
    list_items = third_section_high.find_all('li')

    # EXTRAER VALORES
    li_texts = [li.get_text(strip=True) for li in list_items]

    return li_texts

# MEDLINE URL
url = 'https://medlineplus.gov/spanish/ency/patientinstructions/000984.htm'

# FUNCION
list_items = scrape_list_items_from_third_section(url)
for index, item in enumerate(list_items):
    print(f'{index + 1}: {item}')
