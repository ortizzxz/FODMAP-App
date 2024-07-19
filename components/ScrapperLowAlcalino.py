import requests
from bs4 import BeautifulSoup

def scrape_list_items_between_h2(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive"
    }
    
    try:
        # Realizar la solicitud HTTP
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Levantar una excepción si la solicitud falla

        # Analizar el contenido HTML
        soup = BeautifulSoup(response.content, 'html.parser')

        # Encontrar todos los elementos <h2>
        h2_elements = soup.find_all('h2')
        if len(h2_elements) < 3:
            raise ValueError("El documento HTML no contiene al menos tres elementos <h2>")

        # Identificar el segundo y tercer <h2>
        second_h2 = h2_elements[1]
        third_h2 = h2_elements[2]

        # Encontrar todos los elementos entre el segundo y el tercer <h2>
        list_items = []
        for sibling in second_h2.find_all_next():
            if sibling == third_h2:
                break
            if sibling.name == 'li':
                # Obtener el texto del elemento <li>
                text = sibling.get_text(strip=True)
                # Cortar el texto en el carácter "-" y mantener solo la primera parte
                cut_text = text.split('-')[0].strip()
                cut_text = text.split(':')[0].strip()
                cut_text = text.split(',')[0].strip()
                list_items.append(cut_text)

        return list_items
    except requests.exceptions.RequestException as e:
        print(f"Error en la solicitud HTTP: {e}")
        return []
    except ValueError as e:
        print(e)
        return []

# URL del documento
url = 'https://alcalino-me.nu/lista-alimentos-fodmap/'

# Llamar a la función y mostrar los resultados
list_items = scrape_list_items_between_h2(url)
if not list_items:
    print("No se encontraron elementos <li> entre el segundo y tercer <h2>.")
else:
    for index, item in enumerate(list_items):
        print(f'{index + 1}: {item}')
