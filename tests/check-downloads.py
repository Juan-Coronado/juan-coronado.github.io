from pathlib import Path
import re
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]


class ProjectDownloads(unittest.TestCase):
    def test_sql_sources_and_integration_test_are_included(self):
        with zipfile.ZipFile(ROOT / 'projects/metropolitano-datos/codigo.zip') as archive:
            self.assertTrue({'programa/01_esquema.sql', 'programa/02_vistas.sql', 'programa/03_operaciones.sql', 'tests/integracion.sql'} <= set(archive.namelist()))

    def test_archives_exclude_private_data_binaries_guides_and_git(self):
        archives = list((ROOT / 'projects').glob('*/codigo.zip'))
        self.assertEqual(len(archives), 10)
        secret = re.compile(rb'gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|AIza[0-9A-Za-z_-]{35}|-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----')
        for path in archives:
            with zipfile.ZipFile(path) as archive:
                for name in archive.namelist():
                    item = Path(name)
                    self.assertFalse({'.git', 'App_Data', 'evidencia'} & set(item.parts), (path, name))
                    self.assertNotIn(item.suffix.lower(), {'.exe', '.dll', '.docx', '.pdf', '.rar', '.zip', '.pem', '.key'}, (path, name))
                    self.assertIsNone(secret.search(archive.read(name)), (path, name))


if __name__ == '__main__':
    unittest.main()
