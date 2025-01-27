import {
  Document,
  Page,
  Image as PdfImage,
  Text,
  View,
} from "@react-pdf/renderer";

import type { GeneratedElectionResult } from "@eboto/db/schema";

export default function GenerateResult({
  result,
}: {
  result: Pick<GeneratedElectionResult, "election">["election"];
}) {
  const dateConfig: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Manila",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  };
  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Helvetica",
          padding: 40,
          fontSize: 12,
          paddingBottom: 80,
        }}
      >
        <Text
          style={{
            position: "absolute",
            fontSize: 9,
            bottom: 32,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey",
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            <PdfImage
              src="https://raw.githubusercontent.com/bricesuazo/eboto/main/apps/www/public/images/logo.png"
              style={{
                width: 32,
                height: 32,
                aspectRatio: 1,
                objectFit: "cover",
              }}
            />
            <Text
              style={{
                fontWeight: 20,
                fontFamily: "Helvetica-Bold",
                color: "#2f9e44",
              }}
            >
              eBoto
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {result.logo && (
              <PdfImage
                src={result.logo.url}
                style={{
                  display: "flex",
                  width: 80,
                  height: 80,
                  alignSelf: "center",
                  aspectRatio: 1,
                  objectFit: "cover",
                }}
              />
            )}
            <Text
              style={{
                fontFamily: "Helvetica-Bold",
                fontSize: 18,
              }}
            >
              {result.name}
            </Text>
            <Text>https://eboto-mo.com/{result.slug}</Text>
            <Text>
              {new Date(result.start_date).toLocaleString("en-US", dateConfig)}
              {" - "}
              {new Date(result.end_date).toLocaleString("en-US", dateConfig)}
            </Text>
            <View style={{ marginVertical: 8 }}>
              <Text>Generated on:</Text>

              <Text>{new Date().toLocaleString("en-US", dateConfig)}</Text>
            </View>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>Results</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "center",
            }}
          >
            {result.positions.map((position) => {
              return (
                <View
                  key={position.id}
                  style={{
                    width: 400,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "center",
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      {position.name}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Abstain Count - {position.abstain_count}
                    </Text>
                  </View>

                  <View>
                    {position.candidates
                      .sort((a, b) => b.vote_count - a.vote_count)
                      .map((candidate, idx) => {
                        return (
                          <View
                            key={candidate.id}
                            style={{
                              marginBottom: 4,
                              backgroundColor:
                                idx === 0 ? "#90ee90" : "transparent",
                              padding: 8,
                            }}
                          >
                            <Text>
                              {candidate.last_name}, {candidate.first_name}{" "}
                              {candidate.middle_name}
                            </Text>
                            <Text>
                              <Text
                                style={{
                                  fontFamily: "Helvetica-Bold",
                                }}
                              >
                                {candidate.vote_count}
                              </Text>{" "}
                              vote{candidate.vote_count > 1 && "s"}
                            </Text>
                          </View>
                        );
                      })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}
