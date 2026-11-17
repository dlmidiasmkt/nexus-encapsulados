@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist ".git" (
  git init -q -b main
  git remote add origin https://github.com/dlmidiasmkt/nexus-encapsulados.git
  echo Primeiro envio: crie antes o repositorio publico dlmidiasmkt/nexus-encapsulados no GitHub e ligue o Pages em Settings > Pages ^(branch main^).
)
git add -A
git -c user.name=Nexus -c user.email=nexus@users.noreply.github.com commit -q -m "Site Nexus: mentoria de encapsulados"
git push -u origin main
echo.
echo Pronto. Em 1 a 2 minutos aparece em:
echo https://dlmidiasmkt.github.io/nexus-encapsulados/
echo.
pause
