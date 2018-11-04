<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xml" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <style>
                    *{
                    font-family: "Arial";
                    }
                    h1,h2{
                    color:#78323f
                    }
                    a{
                    color:#783202
                    }
                </style>
            </head>
            <body style="background-color:#d7cec7">
                <h1 align="center">Manifesto</h1>
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <p><b>ID: </b> <xsl:value-of select="id"/></p>
        
        <p><b>Título: </b> <xsl:value-of select="título"/></p>
        
        <xsl:if test="subtítulo">
            <p><b>Subtítulo: </b><xsl:value-of select="subtítulo"/></p>
        </xsl:if>
        
        <xsl:if test="dinício">
            <p><b>Data Início: </b> <xsl:value-of select="dinício"/></p>
        </xsl:if>
        
        <p><b>Data Fim: </b><xsl:value-of select="dfim"/></p>
        
        <p>
            <b>Supervisor: </b>
            <a href="{supervisor/website}">
                <xsl:value-of select="supervisor/nome"/>    
            </a>
            - 
            <a href="mailto:{supervisor/email}">
                Enviar Correio   
            </a>
        </p>
        <hr/>
    </xsl:template>    
    
    <xsl:template match="equipe">
        <h2>Equipa: </h2>
        <ul>
            <xsl:apply-templates/>
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="elemento">
        <li>
            <xsl:choose>
                <xsl:when test="website">
                    <a href="{website}"><xsl:value-of select="nome"/></a> - 
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="nome"/> - 
                </xsl:otherwise>
            </xsl:choose>       
            <xsl:value-of select="id"/> -
            <a href="mailto:{email}">
                Enviar Correio   
            </a>
            <xsl:if test="foto">
                <br/>
                <img src="{foto/@path}" alt="foto" height="70"/>
            </xsl:if>
        </li>
    </xsl:template>
    
    <xsl:template match="resumo">
        <h2>Resumo:</h2>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="para">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="resultados">
        <h2>Resultados:</h2>
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>   
    
    <xsl:template match="resultado">
        <li>
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>