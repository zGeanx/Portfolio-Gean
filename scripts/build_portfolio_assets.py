from __future__ import annotations

import math
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
PDF_OUTPUT = ROOT / "output" / "pdf" / "gean-luca-cv.pdf"
PUBLIC_PDF = ROOT / "public" / "gean-luca-cv.pdf"
OG_OUTPUT = ROOT / "public" / "og-image.png"

GRAPHITE = colors.HexColor("#101817")
TEAL = colors.HexColor("#2E9E84")
MUTED = colors.HexColor("#52635F")
LINE = colors.HexColor("#D8E2DF")
PAPER = colors.HexColor("#F7FAF9")


def build_resume() -> None:
    PDF_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_PDF.parent.mkdir(parents=True, exist_ok=True)

    document = SimpleDocTemplate(
        str(PDF_OUTPUT),
        pagesize=A4,
        rightMargin=15 * mm,
        leftMargin=15 * mm,
        topMargin=13 * mm,
        bottomMargin=13 * mm,
        title="Gean Luca - Curriculo",
        author="Gean Luca",
        subject="Desenvolvedor Front-end",
    )

    base = getSampleStyleSheet()
    name = ParagraphStyle(
        "Name",
        parent=base["Title"],
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=27,
        textColor=GRAPHITE,
        alignment=TA_LEFT,
        spaceAfter=2,
    )
    role = ParagraphStyle(
        "Role",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=14,
        textColor=TEAL,
    )
    contact = ParagraphStyle(
        "Contact",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=MUTED,
    )
    section = ParagraphStyle(
        "Section",
        parent=base["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        textColor=GRAPHITE,
        spaceBefore=7,
        spaceAfter=4,
        borderPadding=(0, 0, 3, 0),
        borderWidth=0,
        borderColor=LINE,
        borderRadius=0,
    )
    body = ParagraphStyle(
        "Body",
        parent=base["BodyText"],
        fontName="Helvetica",
        fontSize=8.9,
        leading=12.7,
        textColor=GRAPHITE,
        spaceAfter=4,
    )
    small = ParagraphStyle(
        "Small",
        parent=body,
        fontSize=8.2,
        leading=11.4,
        textColor=MUTED,
        spaceAfter=3,
    )
    project_title = ParagraphStyle(
        "ProjectTitle",
        parent=body,
        fontName="Helvetica-Bold",
        fontSize=9.3,
        leading=12,
        textColor=GRAPHITE,
        spaceAfter=1,
    )

    header_left = [
        Paragraph("Gean Luca", name),
        Paragraph("Desenvolvedor Front-end", role),
    ]
    header_right = Paragraph(
        "Pelotas, RS - Brasil<br/>"
        '<link href="mailto:geanlucadias12@gmail.com" color="#52635F">'
        "geanlucadias12@gmail.com</link><br/>"
        '<link href="https://geanluca.dev" color="#2E9E84">geanluca.dev</link>  |  '
        '<link href="https://github.com/zGeanx" color="#2E9E84">GitHub</link>  |  '
        '<link href="https://www.linkedin.com/in/gean-luca-a758b5215" color="#2E9E84">LinkedIn</link>',
        contact,
    )
    header = Table([[header_left, header_right]], colWidths=[105 * mm, 75 * mm])
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LINEBELOW", (0, 0), (-1, -1), 1.2, TEAL),
            ]
        )
    )

    skills = Paragraph(
        "<b>Front-end</b><br/>React, Next.js, Vue.js, Vinext, TypeScript, Vite, "
        "Tailwind CSS, shadcn/ui<br/><br/>"
        "<b>Back-end</b><br/>Python, Django, Django REST Framework, Flask, Java, "
        "REST APIs, JWT<br/><br/>"
        "<b>Dados &amp; entrega</b><br/>PostgreSQL, MySQL, SQLite, Docker, Supabase, "
        "Cloudflare Workers, Cloudflare Pages, Render, Git",
        small,
    )
    education = Paragraph(
        "<b>Análise e Desenvolvimento de Sistemas</b><br/>"
        "Senac RS - concluído em 2026<br/><br/>"
        "<b>Foco profissional</b><br/>"
        "Interfaces modernas e responsivas, React, TypeScript, acessibilidade, "
        "integração de APIs e publicação em nuvem.",
        small,
    )
    info_table = Table(
        [
            [Paragraph("TECNOLOGIAS", section), Paragraph("FORMAÇÃO", section)],
            [skills, education],
        ],
        colWidths=[113 * mm, 67 * mm],
    )
    info_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, -1), 8),
                ("LEFTPADDING", (1, 0), (1, -1), 8),
                ("RIGHTPADDING", (1, 0), (1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("LINEBEFORE", (1, 0), (1, -1), 0.6, LINE),
            ]
        )
    )

    projects = [
        (
            "Sistema de Folgas",
            "React, Vite, Django, DRF, JWT, PostgreSQL, Supabase",
            "Aplicação full stack para solicitações de folga, com portal público, painel "
            "administrativo protegido e fluxo de aprovação centralizado na API.",
            "https://github.com/zGeanx/Sistema_De_Folgas",
        ),
        (
            "Pulso TV",
            "React, Vinext, Vite, TypeScript, Tailwind CSS, Cloudflare Workers",
            "Catálogo e agenda de canais e eventos ao vivo, com rotas no servidor para "
            "integração de API externa e políticas de origem para players incorporados.",
            "https://github.com/zGeanx/pulso-tv",
        ),
        (
            "Books Library",
            "Next.js, TypeScript, Flask, SQLite, Docker, shadcn/ui",
            "Sistema para consulta e gerenciamento de livros, conectando uma interface Next.js "
            "a uma API Flask com busca, persistência local e ambiente Docker.",
            "https://github.com/zGeanx/Books-Library",
        ),
    ]
    project_blocks = []
    for title, stack, description, url in projects:
        project_blocks.append(
            KeepTogether(
                [
                    Paragraph(
                        f'<link href="{url}" color="#101817">{title}</link>', project_title
                    ),
                    Paragraph(stack, small),
                    Paragraph(description, body),
                    Spacer(1, 1.5 * mm),
                ]
            )
        )

    story = [
        header,
        Spacer(1, 4 * mm),
        Paragraph("PERFIL", section),
        Paragraph(
            "Desenvolvedor front-end formado em Análise e Desenvolvimento de Sistemas. "
            "Crio interfaces modernas, responsivas e acessíveis com React e TypeScript, "
            "integrando APIs e serviços com atenção a clareza, qualidade e publicação.",
            body,
        ),
        Spacer(1, 2 * mm),
        info_table,
        Spacer(1, 2 * mm),
        Paragraph("PROJETOS SELECIONADOS", section),
        *project_blocks,
    ]

    def draw_page(canvas, doc) -> None:
        canvas.saveState()
        canvas.setFillColor(PAPER)
        canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
        canvas.setFillColor(TEAL)
        canvas.rect(0, 0, 4 * mm, A4[1], fill=1, stroke=0)
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawRightString(A4[0] - 15 * mm, 8 * mm, "geanluca.dev | 2026")
        canvas.restoreState()

    document.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
    shutil.copy2(PDF_OUTPUT, PUBLIC_PDF)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    preferred = Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf")
    return ImageFont.truetype(str(preferred), size=size)


def build_og_image() -> None:
    width, height = 1200, 630
    image = Image.new("RGB", (width, height), "#081211")
    pixels = image.load()
    glow_center = (865, 205)
    for y in range(height):
        for x in range(width):
            distance = math.dist((x, y), glow_center)
            strength = max(0.0, 1.0 - distance / 620.0) ** 2
            pixels[x, y] = (
                8 + int(7 * strength),
                18 + int(34 * strength),
                17 + int(29 * strength),
            )

    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, width - 1, height - 1), outline="#233D38", width=2)

    square = Image.new("RGBA", (500, 500), (0, 0, 0, 0))
    square_draw = ImageDraw.Draw(square)
    square_draw.rectangle((28, 28, 472, 472), outline=(56, 143, 122, 105), width=2)
    square = square.rotate(12, resample=Image.Resampling.BICUBIC, expand=True)
    image.paste(square, (785, -175), square)
    draw = ImageDraw.Draw(image)

    title_font = load_font(78, bold=True)
    role_font = load_font(30)
    body_font = load_font(24)
    mono_like = load_font(18)
    initials_font = load_font(98, bold=True)

    draw.text((72, 112), "Gean Luca", font=title_font, fill="#F2F7F5")
    draw.text((76, 214), "Desenvolvedor Front-end", font=role_font, fill="#4CC6A6")
    draw.text(
        (76, 286),
        "Interfaces modernas - React, TypeScript, APIs e acessibilidade.",
        font=body_font,
        fill="#B5C7C2",
    )
    draw.text(
        (76, 438),
        "React  |  Next.js  |  TypeScript  |  Tailwind CSS  |  Vite",
        font=mono_like,
        fill="#89A09A",
    )
    draw.text((76, 530), "geanluca.dev", font=mono_like, fill="#F2F7F5")

    draw.rectangle((910, 188, 1110, 388), outline="#4CC6A6", width=3)
    initials_box = draw.textbbox((0, 0), "GL", font=initials_font)
    initials_width = initials_box[2] - initials_box[0]
    initials_height = initials_box[3] - initials_box[1]
    draw.text(
        (1010 - initials_width / 2, 288 - initials_height / 2 - initials_box[1]),
        "GL",
        font=initials_font,
        fill="#F2F7F5",
    )

    image.save(OG_OUTPUT, format="PNG", optimize=True)


if __name__ == "__main__":
    build_resume()
    build_og_image()
    print(PDF_OUTPUT)
    print(PUBLIC_PDF)
    print(OG_OUTPUT)
