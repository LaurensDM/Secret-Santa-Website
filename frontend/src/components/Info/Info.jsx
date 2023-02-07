import { useTranslation } from "react-i18next";

export default function Info() {
  const { t } = useTranslation();
  return (
    <>
      <div className="container px-4 py-5 title features">
        <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
          <div className="d-flex flex-column align-items-start gap-2">
            <h3 className="fw-bold">Website Features</h3>
            <p className="text-muted">{t("websiteFeatures")}</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("webFeatH1")}</h4>
              <p className="text-muted">{t("darkModeFeature")}</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("webFeatH2")}</h4>
              <p className="text-muted">{t("musicPlayerFeature")}</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("webFeatH3")}</h4>
              <p className="text-muted">{t("languageFeature")}</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("webFeatH4")}</h4>
              <p className="text-muted">{t("noCookies")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-5 title features">
        <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
          <div className="d-flex flex-column align-items-start gap-2">
            <h3 className="fw-bold">Group Features</h3>
            <p className="text-muted">{t("groupFeatures")}</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("groupFeatH1")}</h4>
              <p className="text-muted">{t("groupFeatP1")}</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("groupFeatH2")}</h4>
              <p className="text-muted">{t("groupFeatP2")}</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("groupFeatH3")}</h4>
              <p className="text-muted">{t("groupFeatP3")}</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("groupFeatH4")}</h4>
              <p className="text-muted">{t("groupFeatP4")}</p>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("groupFeatH5")}</h4>
              <p className="text-muted">{t("groupFeatP5")}</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3"></div>
              <h4 className="fw-semibold mb-0">{t("groupFeatH6")}</h4>
              <p className="text-muted">{t("groupFeatP6")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
