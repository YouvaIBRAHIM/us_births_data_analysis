import re

def get_year_from_string(chaine: str):
    regex = r'\d{4}'

    annee = re.search(regex, chaine)

    if annee:
        return annee.group()
    else:
        raise Exception("Aucune année trouvée.")
